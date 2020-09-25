CREATE OR REPLACE FUNCTION get_table_content(_course_id BIGINT)
RETURNS TABLE(id BIGINT, name TEXT, "fontIcon" VARCHAR, "useFontIcon" BOOL, "iconData" TEXT) AS $$
DECLARE 
	_query TEXT;
BEGIN
	_query = format('
		SELECT id, name, font_icon, use_font_icon, icon_data
		FROM table_content 
		WHERE deleted_by IS NULL AND disabled = FALSE AND course_id = %L
		ORDER BY sort, name
	', _course_id);
	RETURN QUERY EXECUTE _query;
END;
$$ LANGUAGE PLPGSQL CALLED ON NULL INPUT;



CREATE OR REPLACE FUNCTION get_all_sub_table_content_ids(_table_content_id BIGINT)
RETURNS TEXT AS $$
DECLARE 
	ret_val TEXT;
	_query TEXT;
BEGIN
_query = FORMAT('WITH RECURSIVE tc AS (
    SELECT id
    FROM table_content
    WHERE parent_id = %L OR ( parent_id IS NULL AND %L IS NULL)
    UNION
    SELECT rtc.id
    FROM table_content rtc 
    INNER JOIN tc ON tc.id = rtc.parent_id
)

SELECT ARRAY_TO_STRING(ARRAY(SELECT id
FROM tc), %L)', _table_content_id, _table_content_id, ',');

EXECUTE _query INTO ret_val;
IF _table_content_id IS NOT NULL THEN
	IF ret_val = '' THEN
		ret_val = _table_content_id;
	ELSE 
		ret_val = _table_content_id || ',' || ret_val;
	END IF;
END IF;
RETURN ret_val;
END;
$$ LANGUAGE PLPGSQL CALLED ON NULL INPUT;


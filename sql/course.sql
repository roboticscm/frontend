CREATE OR REPLACE FUNCTION get_courses(_menu_id BIGINT)
RETURNS TABLE(id BIGINT, name VARCHAR, description TEXT, "oldPrice" BIGINT, price BIGINT, "soldCount" BIGINT,  "fontIcon" VARCHAR, "useFontIcon" BOOL, "iconData" TEXT) AS $$
DECLARE 
	_query TEXT;
BEGIN
	_query = format('
		SELECT id, name, description, old_price, price, sold_count, font_icon, use_font_icon, icon_data
		FROM course 
		WHERE deleted_by IS NULL AND disabled = FALSE AND menu_id = %L
		ORDER BY sort DESC, name
	', _menu_id);
	RETURN QUERY EXECUTE _query;
END;
$$ LANGUAGE PLPGSQL CALLED ON NULL INPUT;
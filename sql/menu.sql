CREATE OR REPLACE FUNCTION get_menu()
RETURNS TABLE(id BIGINT, name VARCHAR, path VARCHAR, "fontIcon" VARCHAR, "useFontIcon" BOOL, "iconData" TEXT) AS $$
DECLARE 
	_query TEXT;
BEGIN
	_query = format('
		SELECT id, name, path, font_icon, use_font_icon, icon_data
		FROM menu 
		WHERE deleted_by IS NULL AND disabled = FALSE
		ORDER BY sort, name
	');
	RETURN QUERY EXECUTE _query;
END;
$$ LANGUAGE PLPGSQL CALLED ON NULL INPUT;


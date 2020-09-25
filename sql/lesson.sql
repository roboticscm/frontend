CREATE OR REPLACE FUNCTION get_lesson(_table_content_id BIGINT)
RETURNS TABLE(id BIGINT, content TEXT, "videlUrl" TEXT, "starCount" BIGINT, "fontIcon" VARCHAR, "useFontIcon" BOOL, "iconData" TEXT) AS $$
DECLARE 
	_query TEXT;
BEGIN
	_query = FORMAT('
		SELECT l.id, l.content, l.video_url, l.star_count, l.font_icon, l.use_font_icon, l.icon_data
		FROM lesson l, table_content t
		WHERE l.deleted_by IS NULL AND l.disabled = FALSE AND l.table_content_id = t.id
			AND t.id IN (%s)
		ORDER BY t.sort
	', get_all_sub_table_content_ids(_table_content_id));
	RETURN QUERY EXECUTE _query;
END;
$$ LANGUAGE PLPGSQL CALLED ON NULL INPUT;
import express from 'express';
import pgClient from './pg-client';

const router = express.Router();

router.route('/')
	.post( async (rq, rs) => {
		const result = await searchTitle(rq.body.criteria);
		rs.status(200).json(result.rows);
	});

router.route('/detail')
	.post( async (rq, rs) => {
		const result = await getDetail(rq.body.id);
		rs.status(200).json(result.rows[0]);
	})

const searchTitle = ( title_name ) => {
	const criteria = title_name == '' ? '' : `%${title_name}%`
	return pgClient.query(`select * from title where lower(title_name) like lower('${criteria}')`);
}

const getDetail = ( title_id ) => {
	return pgClient.query(`
			select 
				t.id,
				t.title_name,
				t.release_year,
				( select array(select g.name from genre g, title_genre tg where t.id = tg.title_id and tg.genre_id = g.id ) ) as genre_names,
				( select array(select p.name from title_participant tp, participant p where t.id = tp.title_id and tp.participant_id = p.id ) ) as participants,
				( select array(select a.award || ' in ' || a.award_year from award a where t.id = a.title_id and a.award_won = 't' ) ) as awards,
				( select array(select distinct o.title_name_language from other_name o where t.id = o.title_id ) ) as other_langauges,
				( select array(select distinct o.title_name from other_name o where t.id = o.title_id and t.title_name <> o.title_name ) ) as other_titles,
				( select array(select distinct o.title_name_type from other_name o where t.id = o.title_id ) ) as title_name_types,
				( select array(select distinct s.type from storyline s where t.id = s.title_id ) ) as storyline_types,
				( select array(select distinct s.description from storyline s where t.id = s.title_id ) ) as storyline_descriptions
			from title t
			where id = ${title_id}
		`);
}

export default router;
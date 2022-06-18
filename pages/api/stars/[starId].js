import { supabaseAdmin } from '../../../utils/supabase';

const handler = async (req, res) => {
  await supabaseAdmin
    .from('stars')
    .select('*')
    .then((result) => {
      const starId = req.query.starId;
      const single = result.data.filter(
        (result) => result.id === parseInt(starId)
      );
      single.length > 0
        ? res.status(200).json({ data: single[0] })
        : res.status(404).json({
            message: `Planet with id: ${starId} not found`,
          });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
export default handler;

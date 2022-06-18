import { supabaseAdmin } from '../../../utils/supabase';
const handler = async (req, res) => {
  await supabaseAdmin
    .from('planets')
    .select('*')
    .then((result) => {
      const planetId = req.query.planetId;
      const single = result.data.filter(
        (result) => result.id === parseInt(planetId)
      );
      single.length > 0
        ? res.status(200).json({ data: single[0] })
        : res.status(404).json({
            message: `Planet with id: ${planetId} not found`,
          });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

export default handler;

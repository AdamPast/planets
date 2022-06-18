import { supabaseAdmin } from '../../../utils/supabase';

const handler = async (req, res) => {
  await supabaseAdmin
    .from('satellites')
    .select('*')
    .then((result) => {
      const satelliteId = req.query.satelliteId;
      const single = result.data.filter(
        (result) => result.id === parseInt(satelliteId)
      );
      single.length > 0
        ? res.status(200).json({ data: single[0] })
        : res.status(404).json({
            message: `Planet with id: ${satelliteId} not found`,
          });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
export default handler;

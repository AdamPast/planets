import { supabaseAdmin } from '../../../utils/supabase';

const handler = async (req, res) => {
  await supabaseAdmin
    .from('planets')
    .select('*')
    .then((result) => res.status(200).json({ data: result.data }))
    .catch((err) => res.status(500).json({ error: err }));
};
export default handler;

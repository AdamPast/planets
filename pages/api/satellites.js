import { supabaseAdmin } from '../../utils/supabase';
export default function handler(req, res) {
  supabaseAdmin
    .from('satellites')
    .select('*')
    .then((result) => res.status(200).json({ data: result.data }))
    .catch((err) => res.status(500).json({ error: err }));
}

import crypto from 'crypto';
import User from '../models/User.js';

export async function LoginUser(req, res) {
  const { login, pass } = req.body;
  if (!(login && pass)) return res.status(400).json({ ok: false });
  const user = await User.findOne({ login: login, password: pass });
  if (!user) return res.status(404).json({ error: 'not found' });
  req.session.Id = user._id;
  res.status(200).json({ ok: true });
}

export async function RegistrationUser(req, res) {
  const { login, pass } = req.body;
  if (!(login && pass)) return res.status(400).json({ ok: false });
  const user = await User.findOne({ login });
  if (user) return res.status(400).json({ error: 'already exist' });
  await User.create({ login, pass });
  res.status(200).json({ ok: true });
}

export function LogoutUser(req, res) {
  req.session.destroy((err) => {
    if (!err) res.clearCookie('connect.sid').json({ ok: true });
  });
}

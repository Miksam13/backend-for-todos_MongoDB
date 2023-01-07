import Item from '../models/Item.js';

export async function GetItems(req, res) {
  console.log(req.session.Id);
  if (!req.session.Id) return res.status(403).json({ error: 'forbidden' });
  const items = await Item.find({ userId: req.session.Id });
  console.log(items);
  res.status(200).json(items);
}

export async function CreateItem(req, res) {
  if (!req.session.Id) return res.status(400).send('400 Bad Request');
  req.body.userId = req.session.Id;
  const item = await Item.create(req.body);
  res.status(200).json({ id: item._id });
}

export async function PutItem(req, res) {
  if (!req.session.Id) return res.status(400).send({ error: 'Bad Request' });
  const item = await Item.findOneAndUpdate({ _id: req.body._id }, req.body, {
    runValidators: true,
  });
  if (!item) return res.status(400).json({ error: 'Bad Request' });
  res.status(200).json({ ok: true });
}

export async function DeleteItem(req, res) {
  if (!req.session.Id) return res.status(400).json({ error: 'Bad Request' });
  const item = await Item.findOneAndDelete({ _id: req.body._id });
  if (!item) return res.status(404).json({ error: '404 Not found' });
  res.status(200).json({ ok: true });
}

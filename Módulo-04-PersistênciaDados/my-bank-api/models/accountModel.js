import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  agencia: { type: Number, require: true },
  conta: { type: Number, require: true },
  name: { type: String, require: true },
  balance: { type: Number, require: true, min: 0 },
});

const accountModel = mongoose.model('account', accountSchema, 'account');
export { accountModel };

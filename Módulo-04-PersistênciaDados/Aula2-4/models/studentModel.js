import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  name: { type: String, require: true },
  subject: { type: String, require: true },
  type: { type: String, require: true },
  value: {
    type: Number,
    require: true,
    //min: 0,
    validade(value) {
      if (value < 0) {
        throw new Error('Valor negativo não é permitido! ');
      }
    },
  },
  lastModified: { type: Date, default: Date.now },
});

const studentModel = mongoose.model('student', studentSchema, 'student');

export { studentModel };

import mongoose from 'mongoose';

await mongoose.connect(
  'mongodb+srv://bernardofusco:be240588@cluster0.rxfwr.mongodb.net/grades?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const studentSchema = mongoose.Schema({
  name: { type: String, require: true },
  subject: { type: String, require: true },
  type: { type: String, require: true },
  value: { type: Number, require: true },
});

mongoose.model('student', studentSchema);

const student = mongoose.model('student');

new student({
  name: 'Roberta Paes',
  subject: 'Desenvolvedor back end',
  type: 'Trabalho prático',
  value: 29,
})
  .save()
  .then(() => {
    console.log('Documento salvo com sucesso!');
  })
  .catch((err) => {
    console.log('Falha ao inserir o documento! -' + err);
  });

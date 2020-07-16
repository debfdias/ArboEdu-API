import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import api from '../../services/api.js';
import Form from 'react-bootstrap/Form';


//Esse código foi copiado, substituir ou refazer fonte: http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
function validaCPF(CPF) {
  var Soma;
  var Resto;
  Soma = 0;
  CPF = CPF.replace(/\D/g, '');
  if (CPF === "00000000000") return false;

  for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11)) Resto = 0;
  if (Resto !== parseInt(CPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11)) Resto = 0;
  if (Resto !== parseInt(CPF.substring(10, 11))) return false;
  return true;

}

const Admin = () => (
  <div>
    <Formik
      initialValues={{ name: '', email: '', password: '', passwordCheck: '', phone: '', birthday: '', cpf: '', role: 'administrador' }}
      validate={values => {
        const errors = {};

        if (!values.name || values.name.length < 5) {
          errors.name = "Digite seu nome completo"
        }
        //Checa validade do email
        if (!values.email) {
          errors.email = 'Digite seu e-mail';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'E-mail inválido';
        }

        //Checa validade da senha
        if (!values.password) {
          errors.password = "Digite sua senha";
        } else if (values.password.length < 6) {
          errors.password = "Sua senha deve ter 6 caracteres ou mais";
        }
        //Checa validade da checagem de senha
        if (!values.passwordCheck) {
          errors.passwordCheck = "Repita a senha";
        } else if (values.passwordCheck !== values.password) {
          errors.passwordCheck = "As senhas estão diferentes";
        }

        //Chega validade do telefone
        if (!values.phone) {
          errors.phone = "É necessário cadastrar um número de telefone";
        } else if (
          // eslint-disable-next-line
          !/^\(?\d{2}\)?\d{5}\-?\d{4}$/i.test(values.phone)
        ) {
          errors.phone = "Digite um número de telefone válido";
        }

        //checa a validade do CPF
        if (!values.cpf) {
          errors.cpf = "Digite seu CPF"
        } else if (
          !/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/i.test(values.cpf)
        ) {
          errors.cpf = "CPF inválido"
        } else if (!validaCPF(values.cpf)) {
          errors.cpf = "CPF inválido"
        }
        return errors;
      }}


      onSubmit={(values, { setSubmitting }) => {

        console.log(values);
        values.cpf = values.cpf.replace(/\D/g, '');
        values.phone = values.phone.replace(/\D/g, '');

        api.post("/user", values).then((response) => {
          alert("Conta criada com sucesso! ");
        }).catch((error) => {
          alert(error.response.data);
        });
        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="name" placeholder="Nome Completo" />
          <ErrorMessage name="name" component="div" />
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" placeholder="Senha" />
          <ErrorMessage name="password" component="div" />
          <Field type="password" name="passwordCheck" placeholder="Repetir Senha" />
          <ErrorMessage name="passwordCheck" component="div" />
          <ErrorMessage name="phone" component="div" />
          <Field type="text" name="phone" placeholder="Telefone" />
          <ErrorMessage name="birthday" component="div" />
          <Field type="date" name="birthday" />
          <ErrorMessage name="cpf" component="div" />
          <Field type="text" name="cpf" placeholder="CPF" />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Admin;
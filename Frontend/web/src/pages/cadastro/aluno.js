import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import api from '../../services/api.js';
import cepAPI from '../../services/cepAPI.js';


function getCEP(CEP) {
    CEP.replace(/\D/g, '')
    return cepAPI.get(`/${CEP}/json`)
}
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

const Aluno = () => (
    <div>
        <h1>Cadastro Aluno</h1>
        <Formik
            initialValues={{
                name: 'Gabriel', email: 'gaqp@cin.nt', password: 'BATATA100', passwordCheck: 'BATATA100', phone: '81997399333', birthday: '1998-05-24', cpf: '11581086482', role: 'aluno',
                extra: { address_city: '', address_neighborhood: '', address_zip: '53422200', address_number: '12', address_street: '', address_complement: '', authorized: true }
            }}
            validate={values => {
                const errors = {}
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
                //Checa a validade do CEP e se for válido preenche os dados automáticamente
                if (values.extra.address_zip.length !== 8) {
                    errors.address_zip = "CEP inválido"
                } else if (
                    !/^\d{5}-?\d{3}$/i.test(values.extra.address_zip)
                ) {
                    errors.address_zip = "CEP inválido"
                } else if (!values.extra.address_city && !values.extra.address_neighborhood && !values.extra.address_street && !values.extra.address_complement) {
                    getCEP(values.extra.address_zip).then(function (response) {
                        response = response.data;
                        if (!response.erro) {
                            values.extra.address_city = response.localidade
                            values.extra.address_neighborhood = response.bairro
                            values.extra.address_street = response.logradouro
                            values.extra.address_complement = response.complemento
                        }
                    })
                }
                //checa a validade do endereço
                if (!values.extra.address_city) {
                    errors.address_city = "Digite o nome da sua cidade"
                }
                if (!values.extra.address_neighborhood) {
                    errors.address_neighborhood = "Digite o nome do seu bairro"
                }
                if (!values.extra.address_number) {
                    errors.address_number = "Digite o número de sua casa ou digite zero (O) se não houver número"
                }
                if (!values.extra.address_street) {
                    errors.address_street = "Digite o nome ou numero de sua rua"
                }
                return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {

                //console.log(values);
                values.cpf = values.cpf.replace(/\D/g, '');
                values.phone = values.phone.replace(/\D/g, '');
                values.extra.address_zip = values.extra.address_zip.replace(/\D/g, '');
                api.post("/user", values).then((response) => {
                    //console.log(response)
                }).catch((error) => {
                    //console.log(error);
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
                    <ErrorMessage name="address_zip" component="div" />
                    <Field type="text" name="extra.address_zip" placeholder="CEP" />
                    <ErrorMessage name="address_city" component="div" />
                    <Field type="text" name="extra.address_city" placeholder="Cidade" />
                    <ErrorMessage name="address_neighborhood" component="div" />
                    <Field type="text" name="extra.address_neighborhood" placeholder="Bairro" />
                    <ErrorMessage name="address_street" component="div" />
                    <Field type="text" name="extra.address_street" placeholder="Rua" />
                    <ErrorMessage name="address_number" component="div" />
                    <Field type="text" name="extra.address_number" placeholder="Numero" />
                    <ErrorMessage name="address_complement" component="div" />
                    <Field type="text" name="extra.address_complement" placeholder="Complemento" />

                    <button type="submit" disabled={isSubmitting}> cadastrar </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Aluno;
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Button from 'react-bootstrap/Button'
import API from '../../services/api'

export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        // eslint-disable-next-line
        const phoneRegEx = /^\(?\d{2}\)?\d{5}\-?\d{4}$/i
        
        const validationSchema = Yup.object().shape({
            nome: Yup.string().min(3, "Por favor, insira seu nome completo").max(200, "Nome longo demais, por favor verifique se está correto").required("Campo obrigatório"),
            phone: Yup.string().required("Campo obrigatório").min(8, "Por favor insira seu telefone").matches(phoneRegEx, "Por favor, corrija o numero de telefone"),
            email: Yup.string().email("Por favor, insira um email válido").required("Campo obrigatório"),
            cpf: Yup.string().min(11, "Por favor, digite um CPF válido").test('Valida CPF', "Por favor, digite um CPF válido",
                function validaCPF(CPF) {
                    var Soma;
                    var Resto;
                    Soma = 0;
                    if (CPF === undefined || CPF === null) return false
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
                }).required(),
            birthday: Yup.string().required("Campo obrigatório"),
            password: Yup.string().min(8, "Por favor, insira uma senha de pelo menos 8 dígitos").required("Campo obrigatório"),
            role: Yup.string().required(),
            institution:
                Yup.string().when('role', {
                    is: (valor) => valor === ("diretor" || "profissional_educacao" || "profissional_saude"),
                    then: Yup.string().test("Valida Instituição", "Por favor, digite qual instituição você representa",
                        function validaInstituicao(instituicao) {
                            if (instituicao !== undefined) return true
                            return false
                        }
                    ),
                    otherwise: Yup.string().notRequired()
                }),

            district: Yup.string().when('role', {
                is: (valor) => valor === "jovem_ace",
                then: Yup.string().required("Campo Obrigatório"),
                otherwise: Yup.string().notRequired()
            }),

            address_city: Yup.string().when('role', {
                is: (valor) => valor === "aluno",
                then: Yup.string().required("Campo Obrigatório"),
                otherwise: Yup.string().notRequired()
            }),
            address_neighborhood: Yup.string().when('role', {
                is: (valor) => valor === "aluno",
                then: Yup.string().required("Campo Obrigatório"),
                otherwise: Yup.string().notRequired()
            }),
            address_zip: Yup.string().when('role', {
                is: (valor) => valor === "aluno",
                then: Yup.string().required("Campo Obrigatório"),
                otherwise: Yup.string().notRequired()
            }),
            address_number: Yup.string().when('role', {
                is: (valor) => valor === "aluno",
                then: Yup.string().required("Campo Obrigatório"),
                otherwise: Yup.string().notRequired()
            }),
            address_complement: Yup.string().when('role', {
                is: (valor) => valor === "aluno",
                then: Yup.string().required("Campo Obrigatório"),
                otherwise: Yup.string().notRequired()
            }),
            authorized: Yup.bool().when('role', {
                is: (valor) => valor === "aluno",
                then: Yup.bool().oneOf([true], 'É obrigatória a autorização dos responsáveis').required('É obrigatória a autorização dos responsáveis'),
                otherwise: Yup.bool().notRequired()
            }),

        });
        return (
            <Formik initialValues={{
                nome: "",
                phone: "",
                email: "",
                cpf: "",
                birthday: "",
                password: "",
                role: this.props.role,
                institution: "",
                district: "",
                address_city: "",
                address_neighborhood: "",
                address_zip: "",
                address_number: "",
                address_complement: "",
                authorized: false,
            }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    setSubmitting(true);
                    console.log(values)
                    // Resets form after submission is complete
                    resetForm();

                    // Sets setSubmitting to false after form is reset
                    setSubmitting(false);
                }}

            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control type="text" name="nome" placeholder="Insira seu nome" onChange={handleChange} value={values.nome} onBlur={handleBlur}
                                    className={touched.nome && errors.nome ? "error" : null}
                                />
                                {touched.nome && errors.nome ? (
                                    <div className="error-message">{errors.nome}</div>
                                ) : null}

                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Insira seu Email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                                    className={touched.email && errors.email ? "error" : null}
                                />
                                {touched.email && errors.email ? (
                                    <div className="error-message">{errors.email}</div>
                                ) : null}
                            </Form.Group>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control type="text" name="phone" placeholder="Insira seu Telefone" value={values.phone} onChange={handleChange} onBlur={handleBlur}
                                    className={touched.phone && errors.phone ? "error" : null}

                                />
                                {touched.phone && errors.phone ? (
                                    <div className="error-message">{errors.phone}</div>
                                ) : null}
                            </Form.Group>
                            <Form.Group controlId="formCPF">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control type="text" name="cpf" placeholder="Insira seu CPF" value={values.cpf} onChange={handleChange} onBlur={handleBlur} />
                            </Form.Group>
                            {touched.cpf && errors.cpf ? (
                                <div className="error-message">{errors.cpf}</div>
                            ) : null}
                            <Form.Group controlId="formBirthday">
                                <Form.Label>Data de nascimento</Form.Label>
                                <Form.Control type="date" name="birthday" value={values.birthday} onChange={handleChange} onBlur={handleBlur} />
                                {touched.birthday && errors.birthday ? (
                                    <div className="error-message">{errors.birthday}</div>
                                ) : null}
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Insira sua senha" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                {touched.password && errors.password ? (
                                    <div className="error-message">{errors.password}</div>
                                ) : null}
                            </Form.Group>
                            {(this.props.role === "pesquisador"
                                || this.props.role === "profissional_saude"
                                || this.props.role === "profissional_educacao"
                                || this.props.role === "diretor"
                            ) &&
                                <Form.Group controlId="formInstitution">
                                    <Form.Label>Instituição</Form.Label>
                                    <Form.Control type="text" name="institution" placeholder="Insira a instituição que você representa" value={values.institution} onChange={handleChange} onBlur={handleBlur} />
                                    {touched.institution && errors.institution ? (
                                        <div className="error-message">{errors.institution}</div>
                                    ) : null}
                                </Form.Group>
                            }
                            {(this.props.role === "jovem_ace"
                            ) &&
                                <Form.Group controlId="formDistrict">
                                    <Form.Label>Distrito Sanitário</Form.Label>
                                    <Form.Control as="select" name="district" value={values.district} onChange={handleChange} onBlur={handleBlur}>
                                        <option></option>
                                        <option>...</option>
                                    </Form.Control>
                                    {touched.district && errors.district ? (
                                        <div className="error-message">{errors.district}</div>
                                    ) : null}

                                </Form.Group>
                            }
                            {(this.props.role === "aluno"
                            ) &&
                                <React.Fragment>
                                    <Form.Group controlId="formAddressCity">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control name="address_city" type="text" placeholder="Cidade" value={values.address_city} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.address_city && errors.address_city ? (
                                            <div className="error-message">{errors.address_city}</div>
                                        ) : null}

                                    </Form.Group>
                                    <Form.Group controlId="formAddressNeighborhood">
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control name="address_neighborhood" type="text" placeholder="Bairro" value={values.address_neighborhood} onChange={handleChange} onBlur={handleBlur} />
                                    </Form.Group>
                                    {touched.address_neighborhood && errors.address_neighborhood ? (
                                        <div className="error-message">{errors.address_neighborhood}</div>
                                    ) : null}

                                    <Form.Group controlId="formAddressZip">
                                        <Form.Label>CEP</Form.Label>
                                        <Form.Control name="address_zip" type="text" placeholder="CEP" value={values.address_zip} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.address_zip && errors.address_zip ? (
                                            <div className="error-message">{errors.address_zip}</div>
                                        ) : null}

                                    </Form.Group>
                                    <Form.Group controlId="formAddressNumber">
                                        <Form.Label>Número</Form.Label>
                                        <Form.Control name="address_number" type="text" placeholder="Número" value={values.address_number} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.address_number && errors.address_number ? (
                                            <div className="error-message">{errors.address_number}</div>
                                        ) : null}

                                    </Form.Group>
                                    <Form.Group controlid="formAddressComplement">
                                        <Form.Label>Complemento</Form.Label>
                                        <Form.Control name="address_complement" type="text" placeholder="Complemento" value={values.address_complement} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.address_complement && errors.address_complement ? (
                                            <div className="error-message">{errors.address_complement}</div>
                                        ) : null}

                                    </Form.Group>
                                    <Form.Group controlId="formAuthorized">
                                        <Form.Check name="authorized" custom type="checkbox" label="Tenho autorização para ingressar no ArboEdu" id="authorizedCheckbox" value={values.authorized} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.authorized && errors.authorized ? (
                                            <div className="error-message">{errors.authorized}</div>
                                        ) : null}

                                    </Form.Group>
                                </React.Fragment>
                            }
                            <Button type="submit" disabled={isSubmitting}>
                                Criar conta
                </Button>
                        </Form>
                    )}


            </Formik>
        )
    }
}
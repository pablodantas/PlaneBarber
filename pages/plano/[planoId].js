import { getSession, signOut } from 'next-auth/react';
import Users from "../../lib/userSchema";
import Service from "../../lib/serviceSchema";
import connectDB from "../../lib/connectDB";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

function Plano({ user, userBarber, tipos }) {

    const router = useRouter();
    const plano = router.query.planoId;

    const [nome, setChangeNome] = useState('');
    const [cpf, setChangeCpf] = useState('');
    const [celular, setChangeCelular] = useState('');
    const [email, setChangeEmail] = useState('');
    const [cep, setChangeCep] = useState('');
    const [bairro, setChangeBairro] = useState('');
    const [numero, setChangeNumero] = useState('');
    const [cidade, setChangeCidade] = useState('');
    const [estado, setChangeEstado] = useState('');
    const [preleorder, setPreleorder] = useState(false);
    const [service, setService] = useState('');

    useEffect(() => {
        if (userBarber?.existe) {
            setPreleorder(true);
        }
        for (var i = 0; i < tipos.length; i++) {
            if (tipos[i]._id === plano) {
                setService(tipos[i])
            }
        }

    }, [userBarber])

    let infoUserUpdate = {};

    async function updateUser(infoUserUpdate) {
        console.log(infoUserUpdate);
        const { data } = await axios.post("/api/updateUser",
            { profileId: user.profileId, infoUserUpdate },
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        console.log(data)
    }

    function confirmar() {
        if (nome && cpf && celular && email && cep && numero && bairro && cidade && estado) {
            infoUserUpdate.nome = nome;
            infoUserUpdate.cpf = cpf;
            infoUserUpdate.celular = celular;
            infoUserUpdate.email = email;
            infoUserUpdate.cep = cep;
            infoUserUpdate.numero = numero;
            infoUserUpdate.bairro = bairro;
            infoUserUpdate.ativar = false;
            infoUserUpdate.datePagament = new Date();
            infoUserUpdate.cidade = cidade;
            infoUserUpdate.estado = estado;
            infoUserUpdate.servicePlan = plano;
            infoUserUpdate.existe = true;
            updateUser(infoUserUpdate);
        } else if (userBarber?.existe) {
            infoUserUpdate.servicePlan = plano;
            infoUserUpdate.datePagament = new Date();
            updateUser(infoUserUpdate);
        } else {
            console.log("error")
        }
    }

    console.log(tipos)

    return (
        <>
            <div className="row pt-5 flex-column flex-md-row">
                <div className="col card_monthly width_col p-5">
                    <div className="card best_card">
                        <div className="best_saller text-center">
                            <p className="m-0">Mais vendido</p>
                        </div>
                        <div className="padding_card">
                            <h3 className="card_title">{service.tipoServico}</h3>
                            <small>A partir de</small>
                            <h3 className="price">{service.valorServico}<span>/ Mês</span></h3>
                        </div>
                        <hr className="border_card" />
                        <div>
                            <ul>
                                {service.informacao1 ? (
                                    <li className="item_list">
                                        <span className="icon_veri me-2">
                                            <svg width="10" height="10" viewBox="0 0 522 415" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 196.5L107.5 305.5L213.5 414.5L522 75.5L503.5 25L440.5 0L205.5 224L86 110.5L28 135.5L0 196.5Z" fill="#F6B207" />
                                            </svg>
                                        </span> {service.informacao1}
                                    </li>

                                ) : (
                                    null
                                )}
                                {service.informacao2 ? (
                                    <li className="item_list">
                                        <span className="icon_veri me-2">
                                            <svg width="10" height="10" viewBox="0 0 522 415" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 196.5L107.5 305.5L213.5 414.5L522 75.5L503.5 25L440.5 0L205.5 224L86 110.5L28 135.5L0 196.5Z" fill="#F6B207" />
                                            </svg>
                                        </span> {service.informacao2}
                                    </li>

                                ) : (
                                    null
                                )}
                                {service.informacao3 ? (
                                    <li className="item_list">
                                        <span className="icon_veri me-2">
                                            <svg width="10" height="10" viewBox="0 0 522 415" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 196.5L107.5 305.5L213.5 414.5L522 75.5L503.5 25L440.5 0L205.5 224L86 110.5L28 135.5L0 196.5Z" fill="#F6B207" />
                                            </svg>
                                        </span> {service.informacao3}
                                    </li>

                                ) : (
                                    null
                                )}
                                {service.informacao4 ? (
                                    <li className="item_list">
                                        <span className="icon_veri me-2">
                                            <svg width="10" height="10" viewBox="0 0 522 415" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 196.5L107.5 305.5L213.5 414.5L522 75.5L503.5 25L440.5 0L205.5 224L86 110.5L28 135.5L0 196.5Z" fill="#F6B207" />
                                            </svg>
                                        </span> {service.informacao4}
                                    </li>

                                ) : (
                                    null
                                )}
                                {service.informacao5 ? (
                                    <li className="item_list">
                                        <span className="icon_veri me-2">
                                            <svg width="10" height="10" viewBox="0 0 522 415" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 196.5L107.5 305.5L213.5 414.5L522 75.5L503.5 25L440.5 0L205.5 224L86 110.5L28 135.5L0 196.5Z" fill="#F6B207" />
                                            </svg>
                                        </span> {service.informacao5}
                                    </li>

                                ) : (
                                    null
                                )}
                            </ul>
                        </div>
                        <p className="ms-3">Plano selecionado para compra</p>
                    </div>
                </div>
                <div className="col pt-5">
                    <form>
                        <div className="bg-white mb-26">
                            <div className="payment_bg">
                                <div className="bg_orange p-1">
                                    <h4 className="title_form">Tipo de Pagamento</h4>
                                </div>
                                <div className="p-3">
                                    <h5><small>Pix Mercado Pago: </small></h5>
                                    <h4 className="price">49de55e4-ba5a-4d13-99ff-b58bf12b5449</h4>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white pb-5">
                            {!preleorder ? (
                                <>
                                    <div className="bg_orange p-1">
                                        <h4 className="title_form">informe seus dados</h4>
                                    </div>
                                    <div className="mb-3">
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="form_p ">CPF <span className="important">*</span></p>
                                            <input type="text" className="inp_text" onChange={(e) => setChangeCpf(e.target.value)} />
                                        </div>
                                        <div className="col">
                                            <p className="form_p ">Nome <span className="important">*</span></p>
                                            <input type="text" className="inp_text" onChange={(e) => setChangeNome(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">
                                            <p className="form_p  mt-2">Email <span className="important">*</span></p>
                                            <input type="text" className="inp_text" onChange={(e) => setChangeEmail(e.target.value)} />
                                        </div>
                                        <div className="col">
                                            <p className="form_p  mt-2">Celular <span className="important">*</span></p>
                                            <input type="text" className="inp_text" onChange={(e) => setChangeCelular(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h4 className="form_p_no-size ">Endereço</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="form_p">Cep <span className="important">*</span></p>
                                            <input type="text" className="inp_text" onChange={(e) => setChangeCep(e.target.value)} />
                                        </div>
                                        <div className="col">
                                            <p className="form_p">Número <span className="important">*</span></p>
                                            <input type="text" className="inp_text" onChange={(e) => setChangeNumero(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row mb-4 flex-column flex-sm-row">
                                        <div className="col">
                                            <p className="form_p">Bairro <span className="important">*</span></p>
                                            <input type="text" className="inp_text" onChange={(e) => setChangeBairro(e.target.value)} />
                                        </div>
                                        <div className="col">
                                            <p className="form_p">Cidade <span className="important">*</span></p>
                                            <input type="text" className="inp_text" onChange={(e) => setChangeCidade(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="form_p">Estado <span className="important">*</span></p>
                                            <input type="text" className="inp_text" onChange={(e) => setChangeEstado(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            ) : null
                            }
                            <div className="mt-5 btn_container">
                                <button className="btn btn-primary btn-block btn-large" onClick={() => confirmar()}>Concluir</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    await connectDB();

    const userM = await Users.findOne({ profileId: session?.user.profileId }).lean();
    const serviceM = await Service.find({}).lean();

    const services = JSON.parse(JSON.stringify(serviceM));
    const userBarber = JSON.parse(JSON.stringify(userM));

    if (userM !== null) {
        // // userM.bio = userM.bio.toString();
        // userM.avatar = userM.avatar.toString();
    }

    return {
        props: { user: session.user, tipos: services, userBarber: userBarber },
    };
}

export default Plano;
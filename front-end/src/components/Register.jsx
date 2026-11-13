// 20/10 Ayumi: Falta a verificação dos dados inseridos (email, telefone, senha, altura) e conferir pq POST não estpa indo
/* Formato aceito no POSTMAN
{
    "username": "User User",
    "birthdate": "2000-10-10",
    "email": "mail@mail.com",
    "phone":"51999999999",
    "password": "12345678",
    "gender":"FEMALE",
    "height": "160"
  }*/

import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Register.module.css';
import Dialog from './Dialog.jsx';
import axios from 'axios';

const Register = () => {
  //Dados do formulário para cadastro
  const [formData, setFormData] = useState({
    username: '',
    birthdate: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    height: '',
  });
  //Dados do formulário para verificação
  const [verificationData, setVerificationData] = useState({
    passwordConfirmation: '',
    terms: ''
  })

  // Estado para armazenar erros
  const [errors, setErrors] = useState({});
  //Função para remover caracteres especiais de entradas numéricas
  function justNumbers(input) {
    return input.replace(/[^0-9]/g, '');
  }
  // Função para verificar erros
  const validate = () => {
    //Todos os campos obrigatórios já constam como 'required'
    //Objeto para armazenar erros
    let newErrors = {};
    //Validação e-mail.
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido. Deve ter formato user@email.com';
    }
    //Validação de telefone
    if (justNumbers(formData.phone).length != 10 && justNumbers(formData.phone).length != 11) {
      newErrors.phone = 'Telefone inválido. Deve ter o formato (00)0000-0000 ou (00)00000-0000'
    }
    //Validação de senha
    if (formData.password.length < 8) {
      newErrors.password = "O campo de senha precisa de ao menos 8 caracteres";
    }
    //Validação da confirmação de senha
    if (verificationData.passwordConfirmation !== formData.password) {
      newErrors.passwordConfirmation = "O campo de senha precisa coincidir";
    }
    //Validação da altura
    if (formData.height < 0 || formData.height > 300) {
      newErrors.height = "Altura inválida.";
    }
    return newErrors;
  }

  //Configura Dialog pós cadastro
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  }
  const closeDialog = () => {
    setIsDialogOpen(false);
  }

  //Funções para lidar com alterações no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleVerificationChange = (e) => {
    const { name, value } = e.target;
    setVerificationData({
      ...verificationData,
      [name]: value,
    });
  };
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setVerificationData({
      ...verificationData,
      [name]: checked,
    });
  };

  //Funções para lidar com envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validação de erros
    const errorsValidation = validate();
    setErrors(errorsValidation)
    //Se não houver erros, envia dados para cadastro
    if (Object.keys(errorsValidation).length === 0) {
      console.log("Cadastrando...")

      const newRecord = { ...formData };
      try {
        const response = await axios.post('http://localhost:8080/register', newRecord, {
        })
        console.log('Usuário registrado: ', response)
        openDialog();
      } catch (error) {
        console.error('Erro ao registrar usuário:', error)
      }
      setFormData({
        username: '',
        birthdate: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
        height: '',
      });
      setVerificationData({
        passwordConfirmation: '',
        terms: '',
      })
    }

  };

  return (
    <div className={classes.registerContainer}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Informações básicas</legend>
          <div className={classes.inputGroup}>
            <div>
              <label>Nome*</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.name && <p className={classes.errorMsg}>{errors.name}</p>}
            </div>
          </div>
          <div className={classes.inputGroup}>
            <div>
              <label>E-mail*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className={classes.errorMsg}>{errors.email}</p>}
            </div>
          </div>

          <div className={classes.inputGroup}>
            <div>
              <label>Telefone*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(00) 0000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className={classes.errorMsg}>{errors.phone}</p>}
            </div>
            <div>
              <label>Data de nascimento*</label>
              <div>
                <input
                  type="date"
                  id="bithdate"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className={classes.inputGroup}>
            <div>
              <label>Senha*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className={classes.errorMsg}>{errors.password}</p>}
            </div>
            <div>
              <label>Confirme a senha*</label>
              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={verificationData.passwordConfirmation}
                onChange={handleVerificationChange}
                required
              />
              {errors.passwordConfirmation && <p className={classes.errorMsg}>{errors.passwordConfirmation}</p>}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Informações de saúde</legend>
          <div className={classes.inputGroup}>
            <div>
              <label>Gênero*</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Selecionar</option>
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Feminino</option>
                <option value="OTHER">Outro</option>
              </select>
            </div>
            <div>
              <label>Altura (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
              {errors.height && <p className={classes.errorMsg}>{errors.height}</p>}
            </div>
          </div>

        </fieldset>

        <p>
          <span>Os campos indicados com (*) são obrigatórios.</span>
        </p>
        <div className={classes.inputGroup}>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={verificationData.terms}
            onChange={handleCheckbox}
            required
          />
          <span htmlFor="terms">
            Eu li e aceito os <a href="#">Termos de Uso</a> da plataforma.
          </span>
        </div>
        <button type="submit" className={classes.btnEnviar} >Enviar</button>
      </form>

      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        {<div className={classes.registerDialog}>
          <h3>Cadastro realizado com sucesso!</h3>
          <button className={classes.btnEnviar}>
            <Link className={classes.registerLink} to="/login">Fazer login </Link>
          </button>
        </div>}
      </Dialog>
    </div>
  );
};

export default Register;
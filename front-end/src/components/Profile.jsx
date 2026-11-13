// 17/11 falta fazer GET

import { useState, useEffect } from 'react';
import axios from "axios";
import classes from './Profile.module.css';

const Profile = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    birthdate: '',
    email: '',
    phone:'',
    password: '',
    gender:'',
    height: '',
  });

  useEffect(()=>{
    const recoverRecord = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/user`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log('Dados do usuário recuperados: ', response.data)
            setFormData(response.data);
        } catch(error){
            console.error('Erro ao buscar dados do usuário:', error)
            setFormData({})
        }
    }
    
    recoverRecord();
      
},[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newData = {... formData};
    const editRecord = async (newRecord) => {
        try{
            const response = await axios.put(`http://localhost:8080/user`, newData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log('Dados do usuário alterados: ', response.data)
        } catch(error){
            console.error('Erro ao alterar dados do usuário:', error)
        }
      }
    editRecord(newData);
    setFormData(({
      username: '',
      birthdate: '',
      email: '',
      phone:'',
      password: '',
      gender:'',
      height: '',
    }))
  }

  return (
    <div className={classes.profileContainer}>
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
            </div>
          </div>

          <div className={classes.inputGroup}>
            <div>
              <label>Telefone*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(00)0000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
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
                </div>
            </div>

        </fieldset>

          <button type="submit" className={classes.btnEnviar}>Salvar Alterações</button>
      </form>
    </div>
  );
};

export default Profile;
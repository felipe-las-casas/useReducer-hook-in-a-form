
import { useReducer, type ChangeEvent } from 'react';
import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: 'black',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialFormState = {
  fullName: "",
  email: "",
  cpf: "",
  street: "",
  number: "",
  city: "",
  state: ""
}

function formReducer(state: any, action: { type: any; field: any; payload: any; }) {
  switch (action.type) {
    case "HANDLE INPUT TEXT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    default: 
      return state;
  }
}


function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "HANDLE INPUT TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  }

  return (
  <>
    <h1>Formulário</h1>
    <form onSubmit={(e) => {
      e.preventDefault();
      handleOpen();
    }} className='container'>
      <label htmlFor="">Nome Completo</label>
      <input 
        type="text" 
        name='fullName'
        value={formState.fullName} 
        onChange={(e) => handleTextChange(e)}
      />
      <label htmlFor="">E-mail</label>
      <input  
        name="email" 
        type="email" value={formState.email} 
        onChange={(e) => handleTextChange(e)}
      />
      <label htmlFor="">CPF</label>
      <input 
        name='cpf'
        type="text" 
        value={formState.cpf} 
        onChange={(e) => handleTextChange(e)}
      />
      <label htmlFor="">Rua</label>
      <input 
        type="text" 
        name="street"
        value={formState.street} 
        onChange={(e) => handleTextChange(e)}
      />
      <label htmlFor="">Número</label>
      <input 
        type="string" 
        name="number"
        value={formState.number} 
        onChange={(e) => handleTextChange(e)}  
      />
      <label htmlFor="">Cidade</label>
      <input 
        type="text" 
        name="city"
        value={formState.city} 
        onChange={(e) => handleTextChange(e)} 
      />
      <label htmlFor="">Estado</label>
      <input 
        type="text"
        name="state"
        value={formState.state} 
        onChange={(e) => handleTextChange(e)}
      />
      <button type='submit'>Enviar</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pessoa Cadastrada
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            A pessoa cadastrada se chama {formState.fullName}, possui o e-mail {formState.email}, tem o CPF de número {formState.cpf}, mora na casa de número {formState.number}, na cidade de {formState.city}, do estado {formState.state}.
          </Typography>
        </Box>
      </Modal>
    </form>
  </>
  )
}

export default App

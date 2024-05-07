import './Client.css';

function Client() {
  return (
    <div className="client-body">
      <div className='search-client-area'>
        <input className='searche-client-input' type="text" id="fname" name="firstname" placeholder="Nome..." />
        <input className='buttom-search-input' type="submit" value="Buscar" />
      </div>
      <div className='list-client-area'>
        <div className='register-client-buttom-area'>
          <input className='buttom-save-input' type="submit" value="Cadastrar" />
        </div>
        <div className='list-area'>
          Lista de clientes
        </div>
      </div>
      {/* <div className='form-area'>
        <div className='input-box'>
          <label for="fname">Nome</label>
          <input type="text" id="fname" name="firstname" placeholder="Nome..." />
        </div>
        <div className='input-box'>
          <label for="fname">Email</label>
          <input type="email" id="fname" name="firstname" placeholder="Email..." />
        </div>
        <div className='input-box'>
          <label for="fname">Telefone</label>
          <input type="text" id="fname" name="firstname" placeholder="Telefone..." />
        </div>
        <div className='buttom-save-area'>
          <input className='buttom-save-input' type="submit" value="Criar" />
        </div>
      </div> */}
    </div>
  );
}

export default Client;

const Demo = () => {
    const name='gadha';
    const x=10;
    const y=90;
    const names=['gadha ','krishna','veny']
    const loggedIn=false;
    return (
      <>
          <div className='text-5xl' >App</div>
          <p>hello { name}</p>  
          <p> the sum of {x} and {y} is {x+y}</p>  
          <ul>
            {
              names.map((name, index)=>(
                <li key={index}>{name}</li>
              ))
            }
          </ul>
          {loggedIn ? <h1>hello member</h1>:<h1>hello guest</h1>}
</>
    )
}
export default Demo;
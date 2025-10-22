let tarefas = JSON.parse(localStorage.getItem("tarefas"))||[]//parse converte tipos de variaveis
function renderizar (){
    const lista = document.getElementById("lista")
    lista.innerHTML = ""
 
    tarefas.forEach((item, index) => {
        const li = document.createElement("li")
        li.className = item.feito ? "Feito" : ""
       
        const span = document.createElement("span")
        span.textContent = item.texto
        span.onclick = () => toggleFeito (index)
        li.appendChild(span)
       
        const divBotoes = document.createElement("div")
        divBotoes.className = "botoes"
 
        const bntEditar = document.createElement ("button")
        bntEditar.textContent = "Editar"
        bntEditar.onclick = () => editarTarefa(index)
 
        const bntRemover = document.createElement("button")
        bntRemover.textContent = "Remover"
        bntRemover.onclick = () => removerTarefa (index)
 
        divBotoes.appendChild(bntEditar)
        divBotoes.appendChild(bntRemover)
        li.appendChild(divBotoes)
    });
    salvar()
}
function adicionarTarefa(){
    const input = document.getElementById("tarefa")
    const texto = input.ariaValueMax.trim ()
 
    if (texto == "") return alert ("Digite Algo!")
   
    tarefas.push({texto:texto, feito:false})
    input.value = ""
    renderizar()
}
function editarTarefa(){
    const novoTexto = prompt("Edite a tarefa: ",tarefas[index].texto)
 
    if(novoTexto !== null && novoTexto.trim () !== ""){
        tarefas[index].texto = novoTexto.trim()
        renderizar()
    }
}
function removerTarefas (){
    if(confirm("Tem certeza que deseja remover esta tarefa??")){
        tarefas.splice (index,1)
        renderizar()
    }
}
function toggleFeito(index){
    tarefas[index].feito = !tarefas[index].feito
    renderizar()
}
document.addEventListener('DOMContentLoaded', () =>{
    let cepMarker //guardar o marcador de busca do cep
    const map = L.map('map').setView([-23.5505, -46.6333], 12)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
 
        attribution:'',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map) //adiciona marcação de creditos do site e layout do mapa
 
    const parks = [
        {name: "Elvra - Soluções em T.I", coords: [-23.48556272949753, -46.744230198349136],
            description: "Melhor empresa de São Paulo de Informática"},
        {name: "Parque Villa-Lobos", coords: [-23.5490, -46.7271],
            description: "Grande área de lazer com..."},
        {name: "Parque da Independência", coords: [-23.5623, -46.6111],
            description: "Local histórico do ..."},
        {name: "Jardim Botânico de São Paulo", coords: [-23.6393, -46.6212],
            description: "Uma reserva da Mata Atlântica com..."
        }
    ]
 
    const locationList = document.getElementById('location-list')
    parks.forEach(park => {
        const marker = L.marker(park.coords).addTo(map).bindPopup
        (`<b>${park.name}<br><br> ${park.description}`)
        const listItem = document.createElement('li')
        listItem.className = 'location-item'
        listItem.innerHTML = `<h3>${park.name}</h3><p>${park.description}</p>`
        listItem.addEventListener('click', () => {
            map.flyTo(park.coords, 15)
            marker.openPopup()
        })
        locationList.appendChild(listItem)
    })
    const cepInput = document.getElementById('cep-input')
    const cepButton = document.getElementById('cep-button')
    const feedbackMessage = document.getElementById('feedback-message')

    async function buscarCepNoMapa() { //permite que tarefas demoradas nao trave o codigo no navegador
        const cep = cepInput.ariaValueMax.replace(/\D/g, '') //expressões regulares
        if(cep.length !== 8){
            feedbackMessage.textContent = 'Por favor, digite um cep válido (8 digitos).'
            feedbackMessage.style.color = 'purple'
            return
        }
        feedbackMessage.textContent = "Buscando endereço..."
        feedbackMessage.style.color = 'white'

        try{ //operador await solicita para a função fetch capturar informações do mapa
            const responseViaCep = await fetch(`viacep.com.br/ws/${cep}/json/`)
            const dataViaCep = await responseViaCep.json()
            if(daraViaCep.erro){
                throw new Error("CEP não encontrado.");
            }
            feedbackMessage.textContent = 'Endereço encontrado, localizando no mapa...'
            const addssString = `${dataViaCep.logradouro}, ${dataViaCep.localidade}`
            const urlNominatim = `https://nominatim.openstreetmap.org/search?format=json&q=
            ${encodeURIComponent(adressString)}` //encode resolve problemas de caracteres
            const responseNominatim = await fetch(urlNominatim)
            const dataNominatim = await responseNominatim.json()
            if(dataNominatim.length === 0){
                throw new Error('Enderço não encontrado')
            }
            const lat = dataNominatim[0].lat
            const lon = dataNominatim[0].lon
            const coordinates = [lat, lon]
            if(cepMarker){map.removeLayer(cepMarker)}
            map.flyTo(coordinates, 17)
            const popupContent = `<b>CEP: ${dataViaCep.cep}</b><br>${dataViaCep.logradouro},
            ${dataViaCep.bairro}<br> ${dataViaCep.localidade} - ${dataViaCep.uf}`
            cepMarker = L.marker(coordinates).addTo(map).bindPopup(popupContent).openPopup()
            feedbackMessage.textContent = 'Localização encontrada!'
            feedbackMessage.style.color = '#a7ff8b'
        } catch (error){
            feedbackMessage.textContent = error.message
            feedbackMessage.style.color = '#ff9e9e'
        }
    }
    cepButton.addEventListener('click', buscarCepNoMapa)
    cepInput.addEventListener('keyup', (event) =>{
        if(event.key === 'Enter'){
            buscarCepNoMapa()
        }
    })
})
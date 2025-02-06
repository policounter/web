const responses = {
    "saludos": {
        keywords: ["hola", "saludo", "buenos días", "buenas tardes", "buenas noches"],
        response: "¡Hola! ¿En qué puedo ayudarte?"
    },
    "estado": {
        keywords: ["¿cómo estás?", "qué tal", "cómo te va"],
        response: "Estoy bien, gracias por preguntar. ¿Y tú?"
    },
    "despedida": {
        keywords: ["adiós", "chao", "hasta luego", "nos vemos"],
        response: "¡Adiós! Que tengas un buen día."
    },
    "funcionalidad": {
        keywords: ["¿qué puedes hacer?", "qué sabes hacer", "qué haces"],
        response: "Puedo responder preguntas comunes. ¡Pregúntame algo!"
    },
    "ubicacion-oficina": {
        keywords: ["dónde esta la oficina", "ubicacion de la oficina", "dónde queda la oficina"],
        response: "Aquí tienes la ubicación de la oficina:",
        image: "img/logo.png"
    },
    "ubicacion-parque": {
        keywords: ["donde esta el parque", "ubicación del parque", "donde queda el parque"],
        response: "Aquí tienes la ubicación del parque:",
        image: "img/imagenes.png"
    },
    "agradecimientos": {
        keywords: ["gracias", "muchas gracias", "grax"],
        response: "¡De nada! Si tienes más dudas, dime."
    },
    "default": {
        response: "Lo siento, no entendí eso. ¿Puedes reformular la pregunta?"
    }
};

// Función para mostrar sugerencias mientras el usuario escribe
function showSuggestions() {
    let input = document.getElementById('user-input').value.toLowerCase();
    let suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ""; // Limpiar sugerencias anteriores

    if (input.length === 0) {
        suggestionsDiv.style.display = "none"; // Ocultar si no hay texto
        return;
    }

    let suggestions = [];

    for (const key in responses) {
        if (responses[key].keywords && Array.isArray(responses[key].keywords)) {
            responses[key].keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(input) && !suggestions.includes(keyword)) {
                    suggestions.push(keyword); // Agregar solo la palabra clave
                }
            });
        }
    }

    if (suggestions.length > 0) {
        suggestionsDiv.style.display = "block";
    } else {
        suggestionsDiv.style.display = "none";
    }

    // Crear elementos para cada sugerencia
    suggestions.forEach(suggestion => {
        let suggestionElement = document.createElement('div');
        suggestionElement.textContent = suggestion;
        suggestionElement.classList.add('suggestion-item');

        // Evento para que al hacer clic en la sugerencia, se envíe automáticamente al chat
        suggestionElement.onclick = function () {
           /*  document.getElementById('user-input').value = suggestion; */ // Agregar al input sin enviar mensaje automático
           sendMessage(suggestion); // envia el mensaje automaticamente
            suggestionsDiv.innerHTML = "";
            suggestionsDiv.style.display = "none";
        };

        suggestionsDiv.appendChild(suggestionElement);
    });
}


// Función para obtener la respuesta del bot
function getBotResponse(userInput) {
    userInput = userInput.toLowerCase();

    for (const key in responses) {
        if (responses[key].keywords && responses[key].keywords.some(keyword => userInput.includes(keyword))) {
            return responses[key];
        }
    }

    return responses["default"];
}

// Agregar mensaje al chat
function addMessageToChatBox(message, imageUrl = null) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    if (imageUrl) {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.style.maxWidth = "100%";
        imageElement.style.marginTop = "10px";
        chatBox.appendChild(imageElement);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Función para enviar mensaje al chat (desde input o clic en sugerencia)
function sendMessage(userInput) {
    if (userInput.trim() !== "") {
        addMessageToChatBox("Tú: " + userInput);
        const botResponse = getBotResponse(userInput);
        addMessageToChatBox("Chatbot: " + botResponse.response, botResponse.image);
        document.getElementById('user-input').value = "";
    }
}

// Evento para enviar mensaje con el botón
document.getElementById('send-btn').addEventListener('click', function () {
    let userInput = document.getElementById('user-input').value;
    sendMessage(userInput);
    /* CUANDO DAMOS ENVIAR DE QUITE LAS BUSQUEDAS Y NO SE QUEDEN HAY PARA SIEMPRE */
    let suggestionsDiv = document.getElementById('suggestions'); // OBTENER INTANCIA
    suggestionsDiv.innerHTML = ""; // Limpiar sugerencias anteriores
    suggestionsDiv.style.display = "none"; // oculta
   
});

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.on('ready', () => {
  let activities = [
      `${client.guilds.cache.size} servidores.`,
      `${config.prefix}help | v.1.0 `,
      `SIN6N Partner en Twitch`,
      `Viendo a Sin6n en twitch https://www.twitch.tv/sin6n`,
      `Jugando con la API`
  ],
  i = 0;
  setInterval( () =>
  client.user.setActivity(`${activities[i++ % activities.length]}`, {
      type: "WATCHING"
      }), 1000 * 60);

  client.user

     .setStatus("online")
     .catch(console.error);

     console.log('VAQUITA | Online');
     console.log('VAQUITA | Sistema de moderacion Online');
     console.log('VAQUITA | Comandos Online');
     console.log('VAQUITAA | Versión -- v.1.0');

});

var prefix = config.prefix;

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let texto = args.join(" ");
        if(command === 'decir'){
          message.delete()
        if(!texto) return message.channel.send(`Escribe un contenido pára decir.`);
        message.channel.send(texto);

    }

    if(command === 'kick' ){
        let user = message.mentions.users.first(); //Debemos de mencionar a alguien para poder kickearlo.
        let razon = args.slice(1).join(' ');   //Declaramos esta variable para poder poner la razon
        
        var perms = message.member.hasPermission("KICK_MEMBERS"); //Debe tener el permiso "KICK_MEMBERS" para poder ejecutarlo.
        
        if(!perms) return message.channel.send("?No tienes permisos para ejecutar este comando. Lo siento"); //Agregamos un return si no tiene el permiso.
        if (message.mentions.users.size < 1) return message.reply('Para poder patear a alguien por favor mencione.').catch(console.error); //En caso de que no mencionamos a alguien hacemos un return.
        
        if (!razon) return message.channel.send("¡Hey! Necesitas poner una razon para poder patearlo, escribela despues de la mencion.");
        if (!message.guild.member(user).kickable) return message.reply('? No puedo patear al usuario mencionado.'); //Un return si la persona no esta en el server o tiene un role mayor.     
        message.guild.member(user).kick(razon);
        
        //Aqui empezamos a construir el RichEmbed.
        
        const embed = new Discord.MessageEmbed()
        .setAuthor("Vaquita Bot" , client.user.displayAvatarURL)
        .setTitle("ATENCIÓN | Nuevo usuario pateado del servidor")
        .addField(`**${user.username}** fue pateado del servidor, razón: **${razon}**`,  "| La persona responsable fue**:** "+message.author.username)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp() 
        .setColor("RANDOM")
        message.channel.send(embed);
          }


    if(command === '8ball'){
      const db = require('megadb'); //Definimos db
      let blacklist = new db.crearDB('blacklist');
      if(blacklist.tiene(message.author.id)) return message.channel.send(':no_entry_sign: No puedes usar este comando, estás en la blacklist!')
        var rpts = ["Sí","Tas loco verdad?","*Risa Malvada*", "Preguntale eso a una bruja", "Yo solo soy un bot, no puedo responder eso", "No", "¿Por qué?", "Por favor", "Tal vez", "No sé", "Definitivamente", " ¡Claro! "," Sí ", " Por supuesto! "," Por supuesto que no "];

        if (!texto) return message.reply(`Escribe una pregunta.`);
        message.channel.send('Tu Pregunta es: **'+texto+'** \nMi respuesta es: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`');

    }
    if(command == 'luckroyale'){
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send(':no_entry_sign: No puedes usar este comando, estás en la blacklist!')    
var rpts = ["Tu día hoy será una mierda", "Tendrás un día de buena suerte", "Tendrás un día normal", "Te vas a morir okno", "Vas a reprobar"];

        message.channel.send(message.author.username+' Mi respuesta es: '+rpts[Math.floor(Math.random() * rpts.length)]);
    }
if(message.content.startsWith(prefix+"buscaminas")){
  const Discord = require("discord.js");
  //Cadena que da vida al buscaminsa final con los iconos ocultos
  const choices = ["||:zero:||", "||:one:||", "||:two:||", "||:three:||", "||:four:||", "||:five:||", "||:six:||", "||:seven:||", "||:eight:||","||:bomb:||"];
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //Valores que puede tomar una casilla
  const bomb = 9; //El valor 9 representa el de la mina
  let bombas = 20; //NUMERO DE BOMBAS - Se puede cambiar y mejorar si se quiere jugar con eso
  
  let row = number[Math.floor(Math.random() * number.length)]; //Inicializa una posicion aleatoria
  let column = number[Math.floor(Math.random() * number.length)]; //Inicializa una posicion aleatoria
  
  var buscaminas=new Array(10); //Crea un array de 10

  for (let i = 0; i < 10; i++){
    buscaminas[i]=new Array(10); //Hace que el array de antes sea bidimensional (un tablero)
  }

  for (let i = 0; i<10; i++){
    for (let j = 0; j<10 ;j++){
      buscaminas[i][j] = 0;		//Inicializamos el tablero poniendo las casillas a cero
    }
  }
  while (bombas != 0) { // Hasta que no hayamoso colocado todas la bombas no se sale
    while(buscaminas[row][column]==9){ //Cambias las posiciones si en ellas haya una bomba
        row = number[Math.floor(Math.random() * number.length)]; 
        column = number[Math.floor(Math.random() * number.length)];
    }
    //Si encuentra una casilla sin bomba, cambia su valor por el 9 (bomba) y resta una bomba al contador
      bombas = bombas-1;
      buscaminas[row][column] = 9;
      
    //Esta parte es la mÃ¡s liosa, pero lo que hacen los siguientes pasos es  mirar en que posicion esta la bomba para incrementar el valor de las casillas adyacentes si no son bombas.
    
     let iteri = 3; //Numero de casillas por fila para iterar 

		for (let i = 0; i < iteri; i++) {
			let iterj = 3; //Numero de casillas por columna por iterar (Se reinicia por cada fila)
			if (row == 0 && i == 0)
				i++; //Si la casilla estÃ¡ arriba del todo, se le aumenta el valor a la i
			if (row == 10 - 1 && i == 0)
				iteri--; //Si la casilla esta bajo del todo, las iteraciones se decrementan
			for (let j = 0; j < iterj; j++) {
				if (column == 0 && j == 0)
					j++; //Si la casilla estÃ¡ a la izquierda del todo, se le aumenta la j
				if (column == 10 - 1 && j == 0)
					iterj--;//Si la casilla estÃ¡ a la derecha del todo, se decrementan iteraciones
				if (i != 1 || j != 1)//Si no es la casilla inicial
					if (buscaminas[row + i - 1][column - 1 + j] != bomb) //Si no es una bomba
						buscaminas[row + i - 1][column - 1 + j]++; //Incrementar el valor casilla
			}
		}
      
    }
  
   //Finalmente cambiamos los nÃºmeros por los emojis ocultos para crear el juego
  for (let i = 0; i<10; i++){
    for (let j = 0; j<10;j++){
        buscaminas[i][j] = choices[buscaminas[i][j]];
    }
  }
  
  return message.channel.send(buscaminas);
;
}
if(message.content.startsWith(prefix+"tpp")){
const Discord = require("discord.js"); //Requerimos o importamos la libreria Discord.js
  
  //Diccionario conteniendo los movimientos que puedes hacer
  const moves = { piedra: 0, papel: 1, tijera: 2 };
  
  //Esta funcion es basicamente lo que hace % pero de la forma como lo hace Python, que solo devuelve numeros positivos ya que en javascript devuelve negativos
  function wrapIndex(i, i_max) {
    return ((i % i_max) + i_max) % i_max;
  }

  /*Esta funcion será para determinar el ganador
  se pasa como parametro inputs que es una array (collecion, no sé bien como se dice)
  esta array contiene la eleccion del usuario y de la maquina
  */
  function determine_win(inputs) {
    let i = moves[inputs[0]],
      j = moves[inputs[1]];

    return wrapIndex(i + -j, 3);   //Devuelve 0 si es empate, 1 si el jugador de la izquierda ganó (input[0]) y 2 si el de la derecha ganó (inputs[1])
  }
  
  //Esta funcion es simplemente por estetica, recibe como parametro un string y luego cambia el primer caracter a mayuscula y lo demas lo vuelve en minuscula
  function uppercase_first(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  
  //Revisamos si no pasó un argumento
  if (!args[0]) return message.reply("Eliga una entre piedra, papel o tijera. <a:windows_loading:854014009757007882>");
  
  //Revisamos si el argumento que pasó está en el diccionario moves
  if (!args[0] in moves)
    return message.reply("Elige una opcion valida");

  //Obtenemos las keys de moves, esto nos devuelve una array y luego generamos un numero aleatorio entre 0 y 2 y guardamos el movimiento en la variable
  let machineInput = Object.keys(moves)[Math.floor(Math.random() * 3)];
  
  //Se llama a la funcion determine_win con una array conteniendo el movimiento del usuario y el de la maquina
  let winner = determine_win([args[0], machineInput]);
  
  //Creamos el mensaje embed
  const embed = new Discord.MessageEmbed()
    .setTitle("Piedra, papel o tijera.")
    .addFields(
      {
        name: `${message.author.username} eligió`,
        value: uppercase_first(args[0]),
        inline: true
      },
      {
        name: "Computadora eligió",
        value: uppercase_first(machineInput), 
        inline: true
      }
    )
    .setColor(message.guild.me.displayColor)
    .setFooter(
      "Hecho por 『𝕿𝖍𝖊𝕯𝖆𝖓𝖌𝖊𝖗𝖔𝖚𝖘𝕲𝕿』❌#6666",
      "https://midu.dev/images/wallpapers/una-taza-de-javascript.png"
    );
  
  //Aqui usamos condiciones para así mostrar en el mensaje embed el ganador
  if (winner == 0) {
    embed.setDescription("¡Vaya, hubo un empate!");
    return message.channel.send({ embed });
  } else if (winner == 1) {
    embed.setDescription("¡Has ganado, felicidades!");
    return message.channel.send({ embed });
  } else if (winner == 2) {
    embed.setDescription("¡La computadora ha ganado, suerte para la proxima!");
    return message.channel.send({ embed });
  }
}
    if (message.content.startsWith(prefix+"ping")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send(':no_entry_sign: No puedes usar este comando, estás en la blacklist!')
        let ping = Math.floor(message.client.ws.ping);
        message.channel.send(':ping_pong: `'+ping+' ms.` desde heroku.');

    } else if (message.content.startsWith(prefix+"help")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send(':no_entry_sign: No puedes usar este comando, estás en la blacklist!')
        message.channel.send({embed: {
            color: 3447003,
            title: "Ayuda!",
            fields: [
                {
                name: "Comandos",
                value: "Usa: p!commands para ver todos mis comandos disponibles, espero te diviertas",
                },
            ],
        }})

    }else if (message.content.startsWith(prefix+"tiktok")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send(':no_entry_sign: No puedes usar este comando, estás en la blacklist!')
        message.channel.send("Puedes encontrar a Mel en tiktok acá: https://www.tiktok.com/@mel_any05?lang=es%22");

    }  else if (message.content.startsWith(prefix+"owners")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send(':no_entry_sign: No puedes usar este comando, estás en la blacklist!')
        message.channel.send({embed: {
            color: 3447003,
            title: "Owners",
            description: "Estos son mis creadores:\n@! YulianTRB#2608\n@『𝕿𝖍𝖊𝕯𝖆𝖓𝖌𝖊𝖗𝖔𝖚𝖘𝕲𝕿』❌#6666\n@𝓓𝓲𝓪𝓫𝓵𝓪😈#0001"
        }})

    } else if (message.content.startsWith(prefix+"status")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send(':no_entry_sign: No puedes usar este comando, estás en la blacklist!')
        message.channel.send({embed: {
            color: 3447003,
            title: "Bot Status",
            description: `Hola!\n**Actualmente me encuentro en:** ${client.guilds.cache.size} **Servers**\n**Viendo** ${client.channels.cache.size} **Canales**\n**Con** ${client.users.cache.size} **Personas**\n*Bot en Fase Beta*`,
        }})

    } else if (message.content.startsWith(prefix+"invite")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send(':no_entry_sign: No puedes usar este comando, estás en la blacklist!')
        message.channel.send({embed: {
            color: 3447003,
            title: "Invitame a tu Server:",
            description: "https://discord.com/oauth2/authorize?client_id=849406682291503114&scope=bot&permissions=8589934591",
        }})

    }  else if (message.content.startsWith(prefix+"commands")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send(':no_entry_sign: No puedes usar este comando, estás en la blacklist!')
        message.channel.send({embed: {
            color: 3557003,
            title: "Comandos",
            description: "Estos son mis comandos actuales:",
            thumbnail: {
                url: 'https://st.depositphotos.com/1734074/4225/v/600/depositphotos_42256725-stock-illustration-vector-command-line-icon.jpg',
            },
            fields: [
                {
                    name: 'Diversión',
                    value: '1. 8ball\n2. tiktok\n3. wikirandom\n4. hack\n5. avatar',
                },
                {
                  name: 'Acciones',
                  value: '1. kiss\n2. hug\n3. pat\n4. kill\n5. spank'
                },
                {
                    name: 'Interezantes',
                    value: '1. infouser\n2. servidor\n3. status\n4. botinfo\n5. snipe',
                },
                {
                    name: 'Invite',
                    value: '1. invite',
                },
                {
                    name:'Moderación',
                    value:'1. kick\n2. ban\n3. mute\n4. setmuterol',
                },
                {
                    name: 'Extras',
                    value: '1. owners\n2. afk\n3. servers\n4. help',
                },
                {
                  name: 'Música',
                  value: '1. join\n2. leave',
                },
            ],
            footer: {
                text: 'Recuerda que mi prefix es: p! / Pronto habran mas comandos!'
            },
        }})

    } else if (message.content.startsWith(prefix +"servers")){
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
        message.channel.send({embed: {
          color: 3447003,
          tittle: "Nuestros Servidores",
          description: "Te puedes unir a nuestro servidor de soporte acá:\nhttps://discord.gg/zSsJUKbbsy\n Y el servidor de comunidad acá:\nhttps://discord.gg/yrTrjhAhRv",
        }})

    } else if (message.content.startsWith(prefix+"botinfo")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
        message.channel.send({embed: {
            color: 16580352,
            title: "Bot Info!",
            description: "Aquí esta mi información mas interesante <:owo:861460845095157760>",
            fields: [
                {
                    name: 'Developers',
                    value: '@『𝕿𝖍𝖊𝕯𝖆𝖓𝖌𝖊𝖗𝖔𝖚𝖘𝕲𝕿』❌#6666\n@! YulianTRB#2608\n@𝒂𝒓𝒊🐆#6319',
                },
                {
                    name: 'Ayudantes',
                    value: '@さ Syntax#7780\n@! Ethan.#6737',
                },
                {
                    name: 'Servers',
                    value: `${client.guilds.cache.size}`
                },
                {
                    name: 'Usuarios',
                    value: `${client.users.cache.size}`,
                },
                {
                    name: 'Ram',
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
                },
                {
                    name: 'Lenguaje',
                    value: 'JavaScript',
                },
                {
                    name: 'Librería',
                    value: 'Discord.js v12.2.0',
                },
            ],
        }})
    }
    if(message.content.startsWith(prefix+"vipadd")){
      const discord = require('discord.js'); // Requerimo el modulo " discord.js "
const db = require('megadb'); // Requerimos el modulo " megadb "
let vip = new db.crearDB('vip'); // Declaramos la variable "vip" que cree y/o que busque la db "vip" en caso de que ya esté creada



        var id = ["422453810154438656"] // Se asigna la ID de los usuarios que podrán dar los Vip's

        if(!id.some(id => message.author.id == id)) return message.channel.send("No tienes acceso a este comando.") // Si el usuario que quiere ejecutar el comando no está en la lista devuelve un mensaje diciendo que no tiene acceso al comando
        let user = message.mentions.members.first(); // Definimos "user" como la mención a un usuario "(message.mentions.members.first();")

        if(!user) return message.channel.send ("__¡Debes mencionar a un usuario!__") // Si no se mencionó ningún usuario devuelve un mensaje diciendo que menciones a un usuario


        if(vip.has(user.id))return message.channel.send("__**Este usuario ya esta registrado.**__") // Si en la db de "vip" que definimos previamente está la ID del usuario (quiere decír que ya es vip) devuelve un mensaje diciendo que ese usuario ya tiene vip

        vip.establecer(user.id, user.user.tag); // Si todas las condiciones se cumplen se va a establecer en el .json "vip" la id del usuario y el Tag del usuario.
        message.channel.send(
            new discord.MessageEmbed()
            .setDescription("__"+user.user.tag+"__ **ha sido añadido a los usuarios VIP.**")
            .setColor("RANDOM")
        )
    }
    if(message.content.startsWith(prefix+"ticket")){
      if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("Falta de permisos.").then(m => m.delete(60000)); //Si el bot no tiene permisos devuelva False
    if (!args.join(" "))
      return message.channel.send(
        "❌ Error ``|`` **Ingrese Una Razon Para Abrir El Ticket** ❌."
      )
    let everyone = message.guild.roles.cache.find(m => m.name == "@everyone"); //Hace que el bot busque un rol llmado everyone

    let ticketsupport = message.guild.roles.cache.find(
      r => r.name == "『🛠』𝐒𝐓𝐀𝐅𝐅"
    ); //Busca el rol Ticket Support
    if (!ticketsupport)
      return message.channel.send(
        "❌ Error ``|`` **Necesita Crear El Rango** ``Staff`` ❌"
      )//Devuelva false si no existe l rol ticket support

    let nombrech = message.author.tag
      .replace(/[^a-zA-z0-9 ]/g, "")
      .trim()
      .toLowerCase(); //Hace que cree el canal junto al # de el nombre del usuario
    if (message.guild.channels.cache.find(m => m.name.replace(/-/g, " ") == nombrech))
      return message.channel.send("");
    //Usando medios de categorias mucho mas avanzados
    let cate = message.guild.channels.cache.find(
      c => c.name == "tickets" && c.type == "category"
    ); //Que busque una categoria llamada Tickets
    if (!cate)
    message.guild.channels.create(`ticket-${message.author.id}`, { type: 'text' }).then(c => {
        type: "category"
      }); //Que si la categoria no existe devuelva False y cree la categoria

    return message.guild.channels.create(nombrech, {
        type: "text",
        permissionOverwrites: [
          //Que cree el ticket cuando se ejecute el cmd
          //Eligiendo el name y el tipo que sea el canal en este caso "texto"
          {
            id: everyone.id, //Hacemos que l rol everyone le deniege los permisos:
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"] //Ver canal mandar mensajes
          },
          {
            id: ticketsupport.id, //Que al rol Ticket Support le agregue los permisos
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_CHANNELS"] //Ver canal mandar mensajes
          },
          {
            id: message.author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          }
        ],
        parent: cate.id //Eligue una categoria.
      })
      .then(m => {
        message.channel.send(
          ""
        ),
          message.guild.channels.cache.find(m => m.name.replace(/-/g, " ") == nombrech).send(
              new Discord.MessageEmbed()
                .setTitle(`:notebook: **| Nuevo ticket |** :notebook:`)
                .setDescription(
                  `**Aqui Podras Resolver Tus Dudas Para Que El Staff Pueda Colaborarte , Menciona Al Staff Y Te Responderan Lo Mas Rapido Posible**`
                )
                .addField(`Ticket Creado Por:`, message.author)
                .addField(`Razón:`, args.join(" "))
                .setFooter(`BOT | Ticket`)
            );
      })
      .catch(e => {
        message.channel.send(`Parece que hubo un error`), console.log(e);
      }); //Si hay un error que mande este mensaje y un error a la consola.
  }
    if(message.content.startsWith(prefix+"removevip")){
      const discord = require('discord.js')// Requerimos el modulo " discord.js "
const db = require('megadb') // Requerimos el módulo megadb (previamente instalado en la parte 1, si no la viste te recomiendo verla!)
let vip = new db.crearDB('vip') // Declaramos la variable "vip" que cree o busque dentro de la base de datos creada previamente "vip"

        var id = ["422453810154438656"] // Definimos en la variable "id" y ahi mismo colocamos la ID de nuestro perfil para solo nosotros poder utilizar este comando.

        if(!id.some(id => message.author.id == id)) return message.channel.send("No tienes acceso a este comando.") //Si el usuario que envió el mensaje no está en la variable "id" no va a podér utilizar el comando y devuelve un mensaje.

        let user = message.mentions.members.first(); //Definimos "user" como el usuario mencionado con "message.mentions.members.first()"

        if(message.mentions.users.size < 1 || !user) return message.channel.send("**__Menciona a una persona primero!__**");//Si no menciona a nadie devuelve un mensaje que debe mencionar a un usuario

        if(!vip.tiene(`${user.id}`)) return message.reply("Ese usuario no esta en la lista.") //con variable de "vip" que habíamos declarado previamente hacemos que busque en la base de datos "vip" la ID del usuario que mencionamos, si no está en la db devolverá un mensaje diciendo que no está en la lista.


        vip.eliminar(`${user.id}`)
        return message.channel.send("<@"+user + ">"+" ha sido eliminado de la lista vip!.");
    }
    if(message.content.startsWith(prefix+"viphelp")){
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
      const discord = require('discord.js') // Requerimos el Módulo discord.js
let vip = new db.crearDB('vip') //Declaramos la variable "vip" buscando en dentro de la base de datos "vip"

if(!vip.tiene(message.author.id)) return message.channel.send("¡No tienes VIP, no puedes utilizar esta función!") // Si el la ID del usuario no está en la DB devuelve un mensaje.
const embed = new Discord.MessageEmbed() //aqui creamo la Constante llamada Embed
    .setTitle("Comandos") //esta sera el Titulo de Nuestro Embed
    .setAuthor(message.author.username, message.author.avatarURL) 
    .setColor(0x00AE86) // Aqui el Color Ustedes lo colocan como quieran
    .setDescription(":arrow_double_down: :arrow_double_down: :arrow_double_down: ")
//aqui arriba la Descripcion del Embed
    .setFooter("Todos mis comandos van con el prefix p!") //este sera nuestro Footer
    .setThumbnail(message.author.avatarURL) //aqui saldra el avatar del author del mensaje como Thumbnail 
    .addField("Usuarios",
      "viphelp") //aqui colocan los comandos de Usuarios
    
    message.channel.send({embed});
    }
    if(message.content.startsWith(prefix+"bladd")){
      const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb'); //Requerimos megaDB, si no lo tienes debes instalarlo o no funcionará el comando
let blacklist = new db.crearDB('blacklist'); //Creamos la db blacklist donde se guardarán las personas



  var id = ["422453810154438656"] //Definimos la ID de la persona que usará el comando

  if(!id.some(id => message.author.id == id)) return message.channel.send("::no_entry_sign: No tienes permisos para usar este comando!") //Si el que usa el comando no es el dueño retorna a eso

  let user = message.mentions.members.first(); //Definimos un usuario
  if(!user) return message.channel.send (":no_entry_sign: Debes mencionar un usuario!") //Si no menciona a nadie manda esto

  if(blacklist.has(user.id)) return message.channel.send(":white_check_mark: Este usuario ya estaba registrado.") //Si el usuario ya estaba en la blacklist manda esto

  blacklist.establecer(user.id, user.user.tag); //Establece el usuario en la blacklist

  message.channel.send(`Todo ha salido bien, el usuario ${user} fue añadido a la blacklist`) //Todo perfect
    }
    if(message.content.startsWith(prefix+"rbl")){
    const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb'); //Requerimos la db de nuevo
let blacklist = new db.crearDB('blacklist'); //Volvemos a definir la blacklist


  var id = ["422453810154438656"] //Definimos la id del que puede usar el comando

  if(!id.some(id => message.author.id == id)) return message.channel.send(':no_entry_sign: No puedes usar este comando!') //Si el que escribe el comando no es el dueño del mensaje retorna a eso

  let user = message.mentions.members.first(); //Definimos un usuario
  if(!user) return message.channel.send (':warning: Debes mencionar a alguien!') //Si no menciona a nadie manda eso

  if(!blacklist.has(user.id))return message.channel.send(':white_check_mark: Este usuario no estaba en la blacklist!') //Si el usuario no estaba en la blacklsit manda eso

  blacklist.eliminar(user.id, user.user.tag); //Aquí lo elimina

  message.channel.send(`Todo ha salido bien! El usuario ${user} fue eliminado de la blacklist`) //Todo salió guay

 

    }
    if (message.content.startsWith(prefix+"createbackup")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
        const Discord = require("discord.js");
        const backup = require("discord-backup");
          backup.setStorageFolder(__dirname+"/backups/");
        
        //Otra vez vuelvo a subir este comando, porfavor, no me lo borren por los comentaios que hay en los codigos, son porque estoy desarrollando un bot en ingles
        
        //Aparte de eso no olviden instalar el npm de "discord-backup" y crear una carpeta llamda backups
              
            let perms = message.member.hasPermission("ADMINISTRATOR");
        
            if (!perms)
              return message.channel.send(
               "<:elock:762396943610937395>`|` **Sorry "+`${message.author}`+", You don't have `Administrator` permissions to execute that command**"
              );
            backup
              .create(message.guild, {
                jsonBeautify: true
              })
              .then(backupData => {
                // And send informations to the backup owner
                message.author.send(
                  new Discord.MessageEmbed()
                 .setAuthor(`? Backup created successfully ?`)
                  .setColor(message.guild.me.displayHexColor)
                  .setDescription(`To load backup, use >backupload ${backupData.id}`)
                  .setThumbnail(message.author.displayAvatarURL())
                  )
                message.channel.send(//backupData.id
                  new Discord.MessageEmbed()
                  .setAuthor(`? Backup created successfully ?`)
                  .setColor(message.guild.me.displayHexColor)
                  .setThumbnail(message.author.displayAvatarURL())
                  .setDescription("**The backup ID has been sent to the MD**")
                );
              });
    }
    if(message.content.startsWith(prefix+"searchwiki")){
      const { MessageEmbed } = require('discord.js')
const wtf = require('wtf_wikipedia')

let busqueda = args.join(' ') // esta variable es para mas comodidad simplemente
if(!busqueda) return message.channel.send('Olvidaste escribir la busqueda.')
wtf.fetch(busqueda, 'ES').then(doc => { // fetcheamos la busqueda de la persona en la wikipedia en espanol, resolvemos la promesa con un then y obtenemos el articulo de la wikipedia

let info1 = doc.sentences(1).text()

const embed = new MessageEmbed()
.setColor("RANDOM")
.setTitle(doc.json().title) //el title del embed sera el title del articulo de wikipedia

if(!info1){
embed.setDescription(doc.sentences(0).text()) // Si no hay frase 2 o 1 solo pondra en el setDescription la frase 1 o 0
} else {
embed.setDescription(doc.sentences(0).text() + ' ' + doc.sentences(1).text()) // en cambio si si hay frase 2 o 1 pues pones las dos.
}
embed.setFooter('Pedido por '+message.author.tag, message.author.displayAvatarURL())
message.channel.send(embed)
}).catch(err => console.log(err))
    }
    if(message.content.startsWith(prefix+"sserver")){
      if (message.author.id !== '422453810154438656') return message.reply('Este comando solo lo puede usar mi creador');

let argumentos = args.join(' '); // Utilizaremos argumentos para buscar el servidor más adelante...

if (!argumentos) return message.reply('Dime el nombre o ID del servidor para salirme');

// El método .toLowerCase() convierte un string a minúsculas 
let serverReal = client.guilds.cache.find(s => s.name.toLowerCase() === argumentos.toLowerCase() || s.id === argumentos); // Buscamos entre los servidores en los que esté nuestro bot el que su nombre (convertido a minúsculas) sea igual a los argumentos que colocó el usuario (convertido a minúsculas) o el que su ID sea igual a los argumentos del usuario...

// Si no encuentra el servidor retorna ⬇
if (!serverReal) return message.reply('No encontré el servidor!');

message.channel.send('Saliendome del servidor...');
serverReal.leave(); // Finalmente utilizamos el método leave para que el bot salga del servidor.

message.channel.send('Me he salido del servidor correctamente!');
    }

    if(message.content.startsWith(prefix+"logs")){
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
        const bd = require("easy.database")
        const registros = new bd("Canal_registros")
        let channel = message.mentions.channels.first() || client.channels.cache.get(args[0])
        if(!channel){
            return message.reply("Debes poner el ID de un canal")
        }else{
        let embed = new Discord.MessageEmbed()
        .setTitle("⚙ Nueva Configuracion ⚙")
        .setDescription("Se agradece demasiado que me brindes la confianza de realizar los registros")
        .addField("📂 Canal de los registros 📂", channel, true)
        .addField("🖇 Servidor 🖇", message.guild.name, true)
        .addField("📌 ID Servidor 📌", message.guild.id, true)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(message.author, embed).then(m => {
        registros.set(`${message.guild.id}`, channel.id)
        m.delete(50000)
        })
    }
}
if(message.content.startsWith(prefix+"suggest")){
  const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
                let tema = args[0];
        ///El segundo seria la sugerencia
                let sugerencia = args.slice(1).join(' ');
        ///Establecemos un canal donde se mandara la sugerencua
                let canal = client.channels.cache.get('853967206535004161');
        
        ///hacemos el mensaje embed
                const sugerenciaa = new MessageEmbed()
        ///El autor del la sugerencia
                .setAuthor(`Autor: ${message.author.tag}`, message.author.displayAvatarURL())
        
                .setDescription(`**Tema:** ${tema}\n**Sugerencia:** ${sugerencia}`)
                .setColor(0xeaff00)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter("VAQUITA BOT | V2.1", client.user.displayAvatarURL());
        
        ///Mandaremos un mensaje al momento de mandar la sugerencia
                message.reply("Sugerencia enviada con exito!").then(msg => msg.delete({timeout: 5000}));
        
        ///Agradecemos por DM al usuario que mando la sugerencia
                message.author.send("Tu sugerencia sera debatida por el publico. Gracias por sugerir en el servidor.");
        
        ///Agregamos reacciones a la sugerencia, esto es a su gusto!
                canal.send(sugerenciaa).then(m => {
                    m.react('💎')
                    m.react('✅')
                    m.react('❔')
                    m.react('❎')
                    m.react('💩')
                 })
        ////Eliminamos el comando enviado
                 message.delete()
}
    if(message.content.startsWith(prefix+"botrestart")){

let id = ['422453810154438656','546455551723175962','819080793447333918'] //aca va su id, pueden agregar mas id's si quieren

if(!id.some(id => message.author.id == id)) { //si la ID del usuario que ejecuta el comando no esta cargada en la variable retorna con el embed

  const embed = new Discord.MessageEmbed() //creamos el embed
  .setDescription('Solo el developer del bot puede usar este comando.')
  .setColor("RED")
  return message.channel.send(embed) //lo enviamos
} //cerramos

message.channel.send('🕙 | Reinicio en progreso...').then(async msg => {
  msg.edit('🕙 | Reinicio en progreso...'); //edita el mensaje
  client.destroy(); //reiniciamos el bot
  await client.login("ODQ5NDA2NjgyMjkxNTAzMTE0.YLatng.atvVmO1cWX4438ZNrizchm1BMBQ"); //obtienen el token de su bot
  await msg.edit('🕙 | Reinicio en progreso...'); //edita el mensaje x2
  msg.edit(' ✅ | Reiniciado Correctamente!'); //edita el mensaje x3
}); //cerramos

    }

    if (message.content.startsWith(prefix+"report")){
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
 if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
        const moment = require('moment');
        const megadb = require("megadb");
        require("moment-duration-format")
        //Instalamos el npm moment, el plugin moment-duration-format
        //Puedes utilizar megadb como tu base de datos (en este caso para almacenar el canal a donde se enviará reporte)
          
        
        let dia = {
           0:"Domingo",
           1:"Lunes",
           2:"Martes",
           3:"Miércoles",
           4:"Jueves",
           5:"Viernes",
           6:"Sábado"
         }
        let mes = {
           0:"Enero",
           1:"Febrero",
           2:"Marzo",
           3:"Abril",
           4:"Mayo",
           5:"Junio",
           6:"Julio",
           7:"Agosto",
           8:"Septiembre",
           9:"Octubre",
           10:"Noviembre",
           11:"Diciembre"
         }
        
         message.delete(); //Hacemos que el mensaje se borre automáticamente
          let Discord = require ('discord.js') 
          const X = new megadb.crearDB('reports');
         
        //Si no deseas usar una database, puedes definir el canal como una ID: 
    const canal = "839609152020152422"
          
        const reporte = args.join(' ');
          const server = message.guild
          const user = message.author
          const userm = message.mentions.users.first()
          const member = message.member
          const memberm = message.mentions.members.first()
          const menciones = message.mentions.members.filter(x => x.id != message.author.id).map(x => x)
        //Obtenemos un array con las menciones evitando que el autor se mencione a sí mismo  
        
          if(!canal){ //Si el bot no encuentra el canal, mandará un embed de error
          let embederr = new Discord.MessageEmbed()
          .setTitle("__Error:__ Uso incorrecto")
          .setDescription("Primero crea un canal de reportes con ``p! setreports``!")
          .setColor("#ff5252")
          .setFooter("Cometido por: "+message.author.username , message.author.displayAvatarURL({dynamic: true }))
          .setTimestamp()
          return message.channel.send(embederr)
          }
            
            if(!reporte){ //Si no hay argumentos envía un mensaje de error
              let embederr = new Discord.MessageEmbed()
          .setTitle("__Error:__ Uso incorrecto")
          .setDescription("Debes reportar algo!")
          .setColor("#ff5252")
          .setFooter("Cometido por: "+message.author.username , message.author.displayAvatarURL({dynamic: true }))
          .setTimestamp()
          return message.channel.send(embederr)
            }
            
            function info(miembrom){ //hacemos una function para hacer la estructura del reporte más simple
        
              let usuariom = miembrom.user
              if(!usuariom) throw new Error("Debes insertar un miembro! Ejemplo: *info(menciones[0])* - Primer miembro mencionado")//Si haz colocado mal la función, retorna un error en consola
        
              return '**▸ Mention**: ' +usuariom.toString()+
                    '\n**▸ ID**: ' +usuariom.id+
                     '\n**▸ Cuenta creada**: ' +`${
                 dia[usuariom.createdAt.getDay()]} ${usuariom.createdAt.getDate()
                }/${mes[usuariom.createdAt.getMonth()]}/${
                  usuariom.createdAt.getFullYear()}`
                +"  **__(Hace: "+moment.duration(Date.now() - usuariom.createdTimestamp).format("M [meses], D [días]")+")__**\n"+
          '**▸ Fecha de Ingreso**: ' +`${
                  dia[miembrom.joinedAt.getDay()]} ${miembrom.joinedAt.getDate()
                }/${mes[miembrom.joinedAt.getMonth()]}/${
                  miembrom.joinedAt.getFullYear()}`
                +"  **__(Hace: "+moment.duration(Date.now() - miembrom.joinedTimestamp).format("M [meses], D [días]")+")__**"
            }
            
           
            
            
            
            message.channel.send("Enviando reporte! :white_check_mark:")
           
            const embed = new Discord.MessageEmbed() //Embed que se enviará al canal con el reporte del usuario
        
          .setAuthor(user.username+'#'+user.discriminator, user.displayAvatarURL({dynamic:true}))
          .setThumbnail(server.iconURL())
          .setTitle('**Nuevo Reporte**')
          .setDescription(reporte.slice(0,2028))
          .addField("Usuario" , info(message.member)) //Con nuestra función info, insertamos un parámetro GuildMember, para poder obtener toda la información
            if(menciones[0]) embed.addField("Usuario mencionado #1", info(menciones[0])) //Si hay una mencion, crea un nuevo field con el primer mencionado
            if(menciones[1]) embed.addField("Usuario mencionado #2", info(menciones[1])) //Si hay una segunda mención...
        
        //Puedes agregar para que se muestre información de más menciones con:
        //if(menciones[2]) embed.addField("Usuario mencionado #3", info(menciones[2]))
        
          embed.setColor("#F8413A")
          .setFooter('Reportes para ' +server.name, server.iconURL())
          .setTimestamp()
        
         client.channels.cache.get(canal).send(embed)
           
          message.author.send("Tu reporte se ha enviado correctamente al buzón del bot, tu reporte: **"+reporte+"**")
    }
    if (message.content.startsWith(prefix+"infobackup")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
    const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const backup = require("discord-backup");
  backup.setStorageFolder(__dirname+"/backups/");

//Codigo



        let backupID = args[0];
        if(!backupID){
            return message.channel.send(":x: | You must specify a valid backup ID!");
        }
        // Fetch the backup
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let embed = new Discord.MessageEmbed()
                .setAuthor("Backup Informations")
                // Display the backup ID
                .addField("Backup ID", backupInfos.id, false)
                .addField("Server ID", backupInfos.data.guildID, false)
                // Display the size (in mb) of the backup
                .addField("Size", `${backupInfos.size} mb`, false)
                // Display when the backup was created
                .addField("Created at", formatedDate, false)
                .setColor("#FF0000");
            message.channel.send(embed);
        }).catch((err) => {
            // if the backup wasn't found
            return message.channel.send(":x: | No backup found for `"+backupID+"`!");
        });
    }
    if (message.content.startsWith(prefix+"usebackup")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
    const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const backup = require("discord-backup");
  backup.setStorageFolder(__dirname+"/backups/");

//Codigo

	  
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
        }
        let backupID = args[0];
        if(!backupID){
            return message.channel.send(":x: | You must specify a valid backup ID!");
        }
        backup.fetch(backupID).then(async () => {
            message.channel.send(":warning: | When the backup is loaded, all the channels, roles, etc. will be replaced! React with ? to confirm!").then(m => {
				m.react("?")
			const filtro = (reaction, user) => {
            return ["?"].includes(reaction.emoji.name) && user.id == message.author.id;
            };
                m.awaitReactions(filtro, {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch(() => {
                    m.edit(":x: | Time's up! Cancelled backup loading!");
                }).then(coleccionado=> {
				const reaccion = coleccionado.first();
				if(reaccion.emoji.name === "?"){
                  
                  message.author.send(":white_check_mark: | Start loading the backup!");
                  backup.load(backupID, message.guild).then(() => {
                      backup.remove(backupID);
                  }).catch((err) => {
                      return message.author.send(":x: | Sorry, an error occurred... Please check that I have administrator permissions!");
                  });
        };
				})
			})
    });
}
            if(message.content.startsWith(prefix + "lock")) {
              const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')

            var permisosLock = message.member.hasPermission('ADMINISTRADOR');
            if (!permisosLock) return message.channel.send('❌ | No tienes permisos para ejecutar este comando.');

            let channelLock = message.mentions.channels.first() || message.channel;
            let rolstaff = message.guild.roles.cache.find(rolstaff => rolstaff.id === 'ID_ROL');
            let alluser = message.guild.roles.cache.find(aus => aus.name === '@everyone');
            if (!message.member.hasPermission('ADMINISTRADOR')) return message.reply('❌ | No tienes permisos para ejecutar este comando.');

            channelLock.updateOverwrite(alluser, {
              READ_MESSAGE_HISTORY: true,
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });

            channelLock.updateOverwrite(rolstaff, {
              READ_MESSAGE_HISTORY: true,
              SEND_MESSAGES: true,
              ADD_REACTIONS: true
            });

            const embedLock = new Discord.MessageEmbed()
            .setDescription('El canal ha sido bloqueado.')
            .setColor('GREEN');
            message.channel.send(embedLock)

        }
        if(message.content.startsWith(prefix + "wikirandom")) {
          const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
            let wiki = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("[¡Pulsa acá para ir a un artículo random de Wikipedia!](http://es.wikipedia.org/wiki/Special:Random)")
    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wikipedia_svg_logo.svg/1024px-Wikipedia_svg_logo.svg.png")
    
    message.channel.send(wiki)
    }
    if(message.content.startsWith(prefix + "infouser")) {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
    const { MessageEmbed } = require('discord.js')        
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; // Definimos usuario, si mencionamos a alguien se obtendra su informacion, si no mencionamos a nadie se obtendra la informacion de "Nosotros"

        let status; // Hacemos un let vacio
        switch (user.presence.status) {// Hacemos un switch de la funcion Presencia
            case "online":// En el caso online..
                status = "🟢 En linea";// hacemos que el status online pase a decir lo siguiente...
                break;
            case "dnd":// En el caso dnd..
                status = "⛔ No molestar";// hacemos que el status dnd pase a decir lo siguiente...
                break;
            case "idle":// En el caso idle..
                status = "🌙 Ausente";// hacemos que el status idle pase a decir lo siguiente...
                break;
            case "offline":// En el caso offline..
                status = "⚪ Desconectado";// hacemos que el status offline pase a decir lo siguiente...
                break;
        }

        const embed = new MessageEmbed() // Hacemos un nuevo embed
            .setTitle(`Informacion del usuario ${user.user.username}`) // Titulo - Recibimos el "user" y decimos su "username"
            .setColor(`RANDOM`)// Color para hacerlo mas bonito <3
            .setThumbnail(user.user.displayAvatarURL({dynamic : true})) // Un Thumbnail de la foto de perfil del "user".
            .addFields(// Hacemos nuevas Fields
                {
                    name: "Apodo: ",// Nombre - Titulo - Caso 1
                    value: message.member.nickname ? message.member.nickname : "No tiene apodo", // Si el "user" tiene apodo se envia, si es false / no tiene Se envia diciendo que "No tiene Apodo"
                    inline: true // En linea: SI
                },
                {
                    name: "#️⃣ Tag: ",// Nombre - Titulo - Caso 1
                    value: `#${user.user.discriminator}`,// Del "user" sacamos su tag / discriminador
                    inline: true// En linea: SI
                },
                {
                    name: "🆔 ID: ",// Nombre - Titulo - Caso 1
                    value: user.user.id,// Del "user" sacamos su ID
                },
                {
                    name: "Reciente Actividad: ",// Nombre - Titulo - Caso 1
                    value: status,
                    inline: true
                },
                {
                    name: "Estado: ",// Nombre - Titulo - Caso 1
                    value: user.presence.activities[0] ? user.presence.activities[0].state : "Sin estado",// Si el "user" tiene actividad se envia, si no la tiene se envia "Sin Estado"
                    inline: true// En linea: SI
                },
                {
                    name: 'Avatar link: ',// Nombre - Titulo - Caso 1
                    value: `[Pinche Aquí](${user.user.displayAvatarURL()})`// Del "user" obtenemos su Avatar Link, Hacemos que dentro del Array se encuentre el Link y cuando se de Click te reenviara una pagina viendo el avatar del "user"
                },
                {
                    name: 'Dato de creacion: ',// Nombre - Titulo - Caso 1
                    value: user.user.createdAt.toLocaleDateString("es-pe"),// Del "user" obtenemos su Fecha de creacion y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
                    inline: true// En linea: SI
                },
                {
                    name: 'Fecha de entrada al Servidor: ',// Nombre - Titulo - Caso 1
                    value: user.joinedAt.toLocaleDateString("es-pe"),// Del "user" obtenemos su Fecha de entrada al servidor en donde se envio el mensaje y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
                    inline: true// En linea: SI
                },
                {
                    name: 'Roles del usuario: ',// Nombre - Titulo - Caso 1
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),// Del "user" obtenemos sus roles del server y lo mapeamos tambien lo separamos con una coma ","
                    inline: true// En linea: SI
                }
            )

        message.channel.send(embed)
            }
              if(message.content.startsWith(prefix+"marry")){
                const db = require("megadb")
                const db_marry = new db.crearDB("marry")
                const Discord = require("discord.js")
                const fs = require("fs");
                
                
                    const usuario = message.mentions.users.first();// Hacemos que la persona la que quiera proponer matrimonio pueda mencionar o poner una ID
                
                    if (!usuario) return message.channel.send("Debes mencionar a una persona para poder casarte.") // Si la persona no menciona o pone ID de un usuario valido enviara este mensaje.
                
                    if(db_marry.tiene(usuario.id)) return message.channel.send("Esta persona ya esta casada.") // Envia este mensaje si la persona que mencionan ya esta casada.
                
                    if(db_marry.tiene(message.author.id)) return message.channel.send("<a:admin:706359845158387713> Tu ya estas casado con alguien.") // Envia este mensaje si la persona que propone matrimonio esta casada.
                    
                    message.channel.send(`${usuario} aceptas a ${message.author} como tu legitimo(a) esposo(a)? (yes= aceptar)(no= rechazar)`) // Envia el mensaje para proponer matrimonio a la persona.
                
                    const collector = message.channel.createMessageCollector(m => m.author.id === usuario.id && m.channel.id === message.channel.id, {time : 30000}); // Ponemos que tiene 3 segundos para poder responder a este mensaje.
                    
                    collector.on("collect", collected => { 
                    if (collected.content.toLowerCase() === "yes"){ 
                        message.channel.send("Los declaro marido y mujer, Muchísimas felicidades.") // Envia este mensaje si la respuesta de la persona que mencionaron es "yes"
                        db_marry.establecer(message.author.id, {id: usuario.id, tag: usuario.username}) /
                        db_marry.establecer(usuario.id, {id: message.author.id, tag: message.author.username}) // Enviamos esto a la base de datos.
                        
                    } else if (collected.content.toLowerCase() === "no"){ 
                        message.channel.send("Esta ceremonia a terminado.") // Si la respuesta es no enviara este mensaje.
                    }
                });
                
                collector.on("end", collected => { 
                    if (collected.size === 0) return message.channel.send("Lamentablemente la persona con la que se pensaba casar no llego a tiempo a la iglesia, lo sentimos pero esto no puede llevarse a cabo. :rolling_eyes:"); // Si la persona no responde en los 3 segundos de espera, enviara esta respuesta.
                      });
                    
                    }
    if(message.content.startsWith(prefix+"warn")){
      const Discord = require("discord.js")
const bd = require("quick.db")  

var user = message.mentions.users.first()//lee la mencion en el mensaje 
 

 if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes los permisos `ADMINISTRADOR`.")//verifica si el usuario que ejecuto el mensaje tiene permisos de "ADMINISTRADOR"   
  

 if(user == message.author) return message.channel.send(message.author + "  Por que te adviertes a ti mismo? O.o")//si el usuario se menciono asi mismi enviara este mensaje

if (!user) return message.channel.send(" Debes Mencionar a un usuario y mencionar la razon!")//verifica si se menciono a algun usuario

let razon= args.join(" ").slice(22)||"Razón no especificada."//extrae la razon de advertencia al usuario

//los (||) hacen que ssi no ay razon, la razon se cambiara automaticamente a "Razón no especificada."  
 
   let warnembed = new Discord.MessageEmbed()//Embed con informacion del advertido, administrador que advirtio y razon

   .setColor("RANDOM")
   .addField("Usuario Advertido", `${user.username}`)
   .addField("ID Advertido", `ID ${user.id}`)
   .addField("Razón", razon)
   .addField("Adminstrador", `${message.author}`)
   .addField("Canal", message.channel)
  
  message.channel.send(warnembed);
    
bd.add(`count_${user.id}_${message.guild.id}`, 1) //añade un +1 a la base de datos(count_)

let warnsnumbers = bd.fetch(`count_${user.id}_${message.guild.id}`)//extrae informacion de la base de datos (count_)

  bd.push(`warns_${user.id}_${message.guild.id}`, warnsnumbers+"." + razon)//añade el numero del warn con (ola) y la razon con (razon)

  bd.add(`warn_${user.id}_${message.guild.id}`, 1) //agrega a la base de datos (warn_) +1 en numero de advertencias


    }
    if(message.content.startsWith(prefix + "serverinfo")) {
      var server = message.guild;//definimos server


      const embed = new Discord.MessageEmbed()//creamos un embed
      .setTitle("**SERVERINFO**")//establecemos titulo
      .setDescription("**INFORMACION ACTUAL DEL SERVIDOR**")//establecemos descripcion
      .setThumbnail(server.iconURL())//aca aparecera el icono del server
      .setAuthor(server.name, server.iconURL())//aca va a aparecer el icono y nombre del server
      .addField('**ID**', server.id, true)//esto es para obtener la id del server
      .addField('**FECHA DE CREACION**',`${server.joinedAt}`)//con esto obtenemos la fecha de creacion del server
      .addField("**REGION:**", message.guild.region)//con esto obtenemos la region del server
      .addField("** ID DEL OWNER :**",`${server.ownerID}`)//con esto la id del creador del server
      .addField(`**CANALES** [${server.channels.cache.size}]ㅤㅤ`, `Categoria: ${server.channels.cache.filter(x => x.type === "category").size} texto: ${server.channels.cache.filter(x => x.type === "text").size} voz: ${server.channels.cache.filter(x => x.type === "voice").size}`, true)
      //con esto todos los canales del servidor
      .addField('**MIEMBROS**', server.memberCount, true)//con esto obtenemos los miembros que hay en el server
      .addField("**BOTS**",`${message.guild.members.cache.filter(m => m.user.bot).size}`)//con esto obtenemos los bots del server
      .addField('**EMOJIS**',message.guild.emojis.cache.size)//con esto todos los emojis del server 
      .addField('**BOOSTER**',message.guild.premiumSubscriptionCount.toString())// con esto el numero de booster del server
      .addField('**NIVEL DE VERIFICACION**',`${server.verificationLevel}`)//con esto obtenemos el nivel de verificacion del server
      .addField('**ROLES**', server.roles.cache.size,true)//con esto la cantidad de roles
      .setColor("RANDOM")//establecemos el color  yo puse random para que salga diferente color
      message.channel.send(embed);// Envía el embed
  }//cerramos el comando
  

    if(message.content.startsWith(prefix + "mute")) { //Definimos el comando.
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
        let db_muterole = new db.crearDB("canal_rolemute"); //Obtenemos la db.
        
        let permiso = message.member.hasPermission("MANAGE_GUILD");
        let mencionado = message.mentions.members.first();
        let razon = args.slice(1).join(' ');
        
        if(!permiso) return message.reply("No tienes los permisos necesarios. \n`Gestionar_Servidor`");
        if(!mencionado) return message.reply('Especifica a un miembro.');
        if(!razon) return message.channel.send('Especifica el motivo.');
          
        if(!db_muterole.tiene(message.guild.id)) return message.channel.send("En este servidor no esta el rol mute Establecido, Uso: **setmuterole [@rol]**") //Aquí vemos si tienen el rol mute establecido, por eso es importante que vean la parte del setmuterole en mi perfil.
        
        let rol = await
        db_muterole.obtener(message.guild.id)
        
        if(mencionado.roles.cache.has(rol)) return message.channel.send("Este miembro ya esta muteado.") //aquí veremos si el usuario ya está muteado, si el usuario está muteado se enviara este mensaje y si no se enviara el Embed directamente
        
        mencionado.roles.add(rol)
          
        const embedmute = new Discord.MessageEmbed()
        .setTitle(`Modslogs | Mute`)
        .addField(`Moderator:`, `${message.author.username}`)
        .addField(`Miembro:`, `${mencionado}`)
        .addField(`Razon:`, `${razon}`)
        message.channel.send(embedmute); //enviamos
          
        }
        if(message.content.startsWith(prefix + "setmuterol")) { 
          const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
              let db_muterole = new db.crearDB("canal_rolemute"); //obtenemos la db
                    
                      let permiso = message.member.hasPermission("ADMINISTRATOR"); //DEFINIMOS QUE NECESITA PERMISOS
                      if(!permiso) return message.reply('no tienes perms.');
                    
                      let role = message.mentions.roles.first(); //DEFINIMOS QUE TIENE QUE MENCIONAR UN ROLE
                      if (!role) return message.channel.send("menciona un role");
                    
                      db_muterole.establecer(`${message.guild.id}`, `${role.id}`); //Aquí estableceremos el role mute al servidor
                      message.channel.send({ //CREAMOS UN EMBED
                        embed: {
                          color: "00f00f",
                          title: "Mute Role Updated.",
                          description: `Role: <@&${role.id}>`
                        }
                      });
                    }
                    if(message.content.startsWith(prefix + "kiss")) {
                      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
                        const { MessageEmbed } = require('discord.js');
                        const star = require('star-labs');             
                                let aA = message.author
                                let aB = message.mentions.users.first()//utilizamos las menciones
                                if (!aB) return message.channel.send('Menciona a 1 usuario para darle un beso.');//Si no se menciona a alguien, el bot enviara esto.
                                const aC = new MessageEmbed()//Pueden cambiar el embed a nuestro gusto
                                    .setDescription(aA.tag + ' beso a ' + aB.tag)
                                    .setImage(star.kiss()) 
                                    .setFooter(`Comando solicitado por ${message.member.displayName}`, client.user.displayAvatarURL())
                                    .setTimestamp();
                                message.channel.send(aC); 
                    }
                    if(message.content.startsWith(prefix+"hug")){
                      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
                      const Discord = require('discord.js');

let thumb = ["https://i.pinimg.com/originals/bb/dd/81/bbdd816d0e3eee5a66d9aa05a46e45c5.gif","https://cdn73.picsart.com/199107256000202.gif","http://24.media.tumblr.com/5f7087e1796c7059093b20b23573133f/tumblr_mouqpuzlfa1rlyv6to1_500.gif","https://media.tenor.com/images/9fe95432f2d10d7de2e279d5c10b9b51/tenor.gif","https://media.tenor.com/images/ec5f44a6f93adfa22e36a5c78ae44cdf/tenor.gif","https://media.tenor.com/images/a9bb4d55724484be94d13dd94721a8d9/tenor.gif","https://media.tenor.com/images/2e1d34d002d73459b6119d57e6a795d6/tenor.gif", "https://i.pinimg.com/originals/ee/a7/36/eea736d5ebc26281b34fdc6c811f118b.gif", "https://media1.tenor.com/images/c59d80cfd9fa6df2f59396f74a34daeb/tenor.gif?itemid=12629283", "https://acegif.com/wp-content/uploads/anime-love-11.gif"]//hacemos un let thumb para poner los posibles gifs que va a tener
var enlace = thumb[Math.floor(Math.random() * thumb.length)]// un var enlace para poner que va a elegir uno random del let thumb
if(!message.mentions.users.first()) {
const embed = new Discord.MessageEmbed()//definimos embed
message.channel.send('¡Menciona a alguien!')


} else {//hacemos un else por si menciona a alguien

let userm = message.mentions.users.first()//definimos un userm para la persona que menciono

const embed = new Discord.MessageEmbed()//definimos embed
.setDescription("**" + message.author.username + "**" + " le dio un abrazo a " + "**" + userm.username + "**")//la descipcion si quieres puedes cambiarla
.setColor("RANDOM")//color random
.setImage(enlace)//aqui en imagen ponemos el var enlace
.setFooter(`Comando solicitado por ${message.member.displayName}`, client.user.displayAvatarURL())
.setTimestamp();
message.channel.send({embed});
}
}
if(message.content.startsWith(prefix+"pat")){
  const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
  const Discord = require('discord.js');

let thumb = ["https://media1.tenor.com/images/6151c42c94df654b1c7de2fdebaa6bd1/tenor.gif?itemid=16456868", "https://media3.giphy.com/media/ARSp9T7wwxNcs/giphy.gif", "https://i.pinimg.com/originals/ba/0a/18/ba0a18b4028f9c210f830f7a82a574cb.gif", "https://media1.tenor.com/images/d7c326bd43776f1e0df6f63956230eb4/tenor.gif?itemid=17187002", "https://i.pinimg.com/originals/8b/42/6c/8b426c9bedc37054cd7e73925fa10da5.gif", "https://image.myanimelist.net/ui/FgSQXwnU0GElnZ3SNgHOiNam-1CbaWgqKPhytOJMPjm7I2utVNDpJ8x9kIxw2NseprqqRy088lq_6DyUgxLJN5Kx37EoyFu0xbniS6DVyAo", "https://66.media.tumblr.com/1c433aeea03d0fcee34c22696ba1307b/tumblr_osl1kmMWL91qbvovho1_400.gifv", "https://66.media.tumblr.com/a72dd82535f3e7accd827c202dacc09a/tumblr_pfyiqz0pFL1th206io1_640.gif", "https://64.media.tumblr.com/80f4e1aeee44dee530b1e6b416a8459d/83ad7e3b43d48041-53/s500x750/ddbb45d884338428dd0f1e042099b353fd3f49b3.gifv", "https://i.imgur.com/LUypjw3.gif", "https://66.media.tumblr.com/c078d8f0bd36f6d4520d9cb9f5c164ac/tumblr_p2kzogLOZU1vajq0ro7_500.gif", "https://media1.tenor.com/images/8b5711095b0ba786c43b617bf9c675dd/tenor.gif?itemid=15735895", "https://i0.wp.com/cloud-3.steamusercontent.com/ugc/93852834496370454/39194370AA7AC1056892B7F839643B24901F22BB/?resize=650,400", "https://i0.wp.com/thumbs.gfycat.com/TautInformalIndianjackal-small.gif?resize=650,400", "https://media1.tenor.com/images/291ea37382e1d6cd33349c50a398b6b9/tenor.gif?itemid=10204936"]//hacemos un let thumb para poner los posibles gifs que va a tener
var pat = thumb[Math.floor(Math.random() * thumb.length)]// un var enlace para poner que va a elegir uno random del let thumb
if(!message.mentions.users.first()) {
const embed = new Discord.MessageEmbed()//definimos embed
message.channel.send('¡Menciona a alguien!')


} else {//hacemos un else por si menciona a alguien

let userm = message.mentions.users.first()//definimos un userm para la persona que menciono

const embed = new Discord.MessageEmbed()//definimos embed
.setDescription("**" + message.author.username + "**" + " le dio una palmadita a " + "**" + userm.username + "**")//la descipcion si quieres puedes cambiarla
.setColor("RANDOM")//color random
.setImage(pat)//aqui en imagen ponemos el var enlace
.setFooter(`Comando solicitado por ${message.member.displayName}`, client.user.displayAvatarURL())
.setTimestamp();
message.channel.send({embed});
}
}

if(message.content.startsWith(prefix+"kill")){
  const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
 if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
  const Discord = require('discord.js');

let thumb = ["https://media1.tenor.com/images/25f853a32137e24b11cd13bc2142f63a/tenor.gif?itemid=7172028", "https://i.imgur.com/m8ZtlNO.gif", "https://i.pinimg.com/originals/d1/2a/1d/d12a1d81b98a743258375aa758b7f6d9.gif", "https://media1.tenor.com/images/3ed3c3c2fdc5406436f37b1e1b9efe62/tenor.gif?itemid=17008759", "http://24.media.tumblr.com/68472fad036c03520ee5e5ef6825c188/tumblr_mwobunzhg01rcj8eco1_500.gif", "https://i.pinimg.com/originals/9d/50/a9/9d50a9437eb26393b76b3ac983133dac.gif", "http://37.media.tumblr.com/8aac647e8c1bae75b43d38991f3945df/tumblr_nah08lNX2V1sijhkdo1_500.gif", "https://i.pinimg.com/originals/5d/90/8a/5d908affd86af87bb893864f8c0d38a4.gif", "https://gifimage.net/wp-content/uploads/2017/09/anime-kill-gif-10.gif", "https://pauanimedia.files.wordpress.com/2013/10/kill-la-kill-gif-de-crofesima-visite-pandatoryu.gif"]//hacemos un let thumb para poner los posibles gifs que va a tener
var kill = thumb[Math.floor(Math.random() * thumb.length)]// un var enlace para poner que va a elegir uno random del let thumb
if(!message.mentions.users.first()) {
const embed = new Discord.MessageEmbed()//definimos embed
message.channel.send('¡Menciona a alguien!')


} else {//hacemos un else por si menciona a alguien

let userm = message.mentions.users.first()//definimos un userm para la persona que menciono

const embed = new Discord.MessageEmbed()//definimos embed
.setDescription("**" + message.author.username + "**" + " mató a " + "**" + userm.username + "**")//la descipcion si quieres puedes cambiarla
.setColor("RANDOM")//color random
.setImage(kill)//aqui en imagen ponemos el var enlace
.setFooter(`Comando solicitado por ${message.member.displayName}`, client.user.displayAvatarURL())
.setTimestamp();
message.channel.send({embed});
}
}
if(message.content.startsWith(prefix+"spank")){
  const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
  const Discord = require('discord.js');

let thumb = ["https://i.imgur.com/ZpCeihh.gif", "https://gifs.iloopit.net/resources/fa5cde40-bdf3-4e8b-bc4d-e982e9c5e25a/converted.gif", "https://i.imgur.com/6DF495Z.gif", "https://media1.tenor.com/images/a11bb82c4809d7d31fc8e30cfce63c3c/tenor.gif?itemid=20087774", "https://tbib.org//images/3187/1a0fabc2cc826670a243fa87e3e57c2075217d78.gif", "https://images-ext-2.discordapp.net/external/sJ02K8PpTzc53Qre2Hz9N_2l-ExBab_QD0jbF336fYM/https/nekocdn.com/images/OGh0nN0o.gif", "https://images-ext-2.discordapp.net/external/U0zHf5LYgvumDnlSMr_pU8Hbj8C59NuOZgZ71K15_20/https/nekocdn.com/images/3GmXaB3gj.gif", "https://images-ext-2.discordapp.net/external/uNkCpAyqzLnoSSdYYVKwMD8Ha4Z9Ln8IDjC1_jl1ZmI/https/nekocdn.com/images/rs8Hdy2N.gif"]//hacemos un let thumb para poner los posibles gifs que va a tener
var kill = thumb[Math.floor(Math.random() * thumb.length)]// un var enlace para poner que va a elegir uno random del let thumb
if(!message.mentions.users.first()) {
const embed = new Discord.MessageEmbed()//definimos embed
message.channel.send('¡Menciona a alguien!')


} else {

let userm = message.mentions.users.first()

const embed = new Discord.MessageEmbed()
.setDescription("**" + message.author.username + "**" + " le dió una nalgada a " + "**" + userm.username + "**")//la descipcion si quieres puedes cambiarla
.setColor("RANDOM")//color random
.setImage(kill)//aqui en imagen ponemos el var enlace
.setFooter(`Comando solicitado por ${message.member.displayName}`, client.user.displayAvatarURL())
.setTimestamp();
message.channel.send({embed});
}
}
   if(message.content.startsWith(prefix+"botchangename")){
    const Discord = require ("discord.js")
    
    var ids = ["422453810154438656"];//ahi pones tu id para que nadien pueda utilizar mas este comando. 
    let nombre = args.join(" ")
    if(!ids.some(ids => message.author.id == ids)) return;
    
    if(!nombre) return message.reply('Mi Dios, debes poner un nombre.')//esto enviara al canal que pusiste el comando si no pusistes un nombre.
      const embed = new Discord.MessageEmbed()//un simple embed...
      .setTitle('Mi nombre ha sido cambiado por ' + message.author.username)
      .setDescription('Nuevo nombre: **' + nombre + '**')
      .setColor('RANDOM')
      
      message.client.user.setUsername(nombre)//aqui cambia el nombre del bot
      message.channel.send(embed).then(m => m.delete(10000))
    
    
    //perdon por no explicar bien.
   }
        if(message.content.startsWith(prefix + "hack")) {
          const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')

            let bot = client.user.username;
            let botavatar = client.user.avatarURL();

            let usuario = message.author;
            let usuarioavatar = message.author.avatarURL();

            let usuarioahackear = message.mentions.users.first();
            if(!usuarioahackear) return message.channel.send("❌ | ¡Debes mencionar a un usuario!")

            let nombres = ["SantaClaus", "Rodolfo", "Benito Camela", "Kein Becil"]
            let ips = ["235.167.118.78", "185.237.237.47", "104.44.140.116", "251.97.130.852", "161.39.172.100"]
            let correos = ["SantaPro123@gmail.com", "Kein564@gmail.com", "Benito12@gmail.com"]
            let contraseñas = ["ImRodolfo", "Benito", "Santaclaus1", "KeinPro12"]

            let embed = new Discord.MessageEmbed()
            .setAuthor(bot, botavatar) //Definimos el encabezado del embed
            .setTitle("Comando Hack") //Ponemos un titulo al embed
            .setDescription("Creado Por <@438819279165456406>") //Ponemos una descripción al embed
            .addField("Quien Envio El CMD:", usuario.tag) //Definimos el usuario hackeado
            .addField("Nombre:", nombres[Math.floor(Math.random() * nombres.length)]) //Definimos que las respuestas sean aleatorias.
            .addField("Dirección IP:", ips[Math.floor(Math.random() * ips.length)]) //Definimos que las respuestas sean aleatorias.
            .addField("Correó electronico:", correos[Math.floor(Math.random() * correos.length)]) //Definimos que las respuestas sean aleatorias.
            .addField("Contraseña:", contraseñas[Math.floor(Math.random() * contraseñas.length)]) //Definimos que las respuestas sean aleatorias.
            .setColor("GREEN") //Le ponemos un color de la barra de la izquierda, en este caso el verde.
            .setFooter(usuario.username, usuarioavatar) 

            message.channel.send(embed) 

        }



        if(message.content.startsWith(prefix+"encuesta")){
          if(!args) return message.channel.send('Agrege una pregunta para la encuesta.')  
 
          const embed = new MessageEmbed() //Mensaje que enviara
               .setAuthor('Pregunta:')
               .setDescription('**'+args.join(' ')+'**\n???????????')
               .addField('Opcion 1', '✅ Si')
               .addField('Opcion 2', '❌ No')
               .addField('Opcion 3', '🤷‍♂️ Preguntale eso a una bruja')
               .setColor(0xff4d4d)
               .setTimestamp()
         
               message.channel.send(embed).then(m => {
                m.react('✅')
                m.react('❌')
                m.react('🤷‍♂️')
           });
          }
    });
    client.on("messageDelete", (message) => {

        client.snipes.set(message.channel.id, {
              content: message.content,
              delete: message.author,
              canal: message.channel
            });

        });
    const { Client, MessageEmbed } = require("discord.js");
    client.snipes = new Map();
    client.on("messageDelete", (message) => {
    client.snipes.set(message.channel.id, {
          content: message.content,
          delete: message.author,
          canal: message.channel
        });
    });

    client.on("message", (message) => {
      if(message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd === "snipe"){
      const db = require('megadb'); //Definimos db
      let blacklist = new db.crearDB('blacklist');
      if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
     const channel = message.mentions.channels.first() || message.channel;
    const msg = client.snipes.get(channel.id);
        if (!msg){
         message.channel.send("No se ha borrado recientemente ningun mensaje")
           .then(m => m.delete({timeout: 5000}));
        }else{
     const main = new MessageEmbed()
     .setColor("RANDOM")
     .setAuthor(`Mensaje Escrito de ${msg.delete.tag}`, msg.delete.displayAvatarURL())
     .addField("Canal", `<#${msg.canal.id}>`)
     .setDescription(`${msg.content}`)
     message.channel.send(main)
    }
    }
    if(cmd== "iguser"){
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
        const Discord = require("discord.js");
        const Instagram = require("user-instagram");

        
            /*para esto requeriremos un npm llamado user-instagram
            para instalarlo solo pon en la consola npm install user-instagram
            bueno comensemos*/
            if(message.author.bot){//para primero si el autor del mensaje es un bot 
                return ;//returnamos nada simplemente cerramos
            }
            var busqueda = args.join(" ")//creamos una variable busqueda la que sera todos los argumentos
            if(!busqueda){//si no puso ningun argumento (una busqueda) 
                return message.channel.send('por favor pon una busqueda')//returnamos un mensaje en el que le diremos que ponga una busqueda
            }//si no ocurrio nada de lo antierior (no era un bot y si puso una busqueda) hacemos la busqueda
            let TrueFalse = { //creamos una varible la que usaremos despues para poner cosas como que si una cuenta esta verificada si es privada etc
                'true' : "Si",
                'false' : "No"
            }
            message.channel.send('buscando...').then(msg  => { //ponemos un mensaje en el canal y lo obtenemos como msg
        
            Instagram(busqueda).then(res =>{//con la const intagram que es el npm buscamos los datos de nuestra busqueda y lo obtenemos como res
                const embed = new Discord.MessageEmbed()//creamos un mensaje embed
                .setThumbnail(res.profilePicHD)//a nuestro embed le agregamos un setTumbnail en la que pondremos el logo de la persona que buscamos
                .setColor("GREEN")//Agregamos un setcolor con el que haremos el embed de color verde
                .addField('ID', res.id , true)/*entramos a los resultados de nuestra busqueda y sacamos id si quieres ver todos los datos pues puedes poner un 
                console.log(res)*/
                .addField('Nombre Completo', res.fullName , true)//agregamos otro field en la que sacaremos el full name por ejemplo de fernanflo su full name seria Fernanfloo
                .addField('Apodo', res.username ,true)//creamos otra field en la que buscaremos el apodo de la persona siguiendo con le ejemplo con fernanfllo su apodo seria fernanfloo ya que asi lo tiene puesto
                .addField('Segidores', res.subscribersCount,true)//agregamos otro field en la que pondremos el total de segidores de la persona
                .addField('Siguiendo', res.subscribtions , true)//agregamos otro field en la que sacaremos el total de personas que este usuarios sige
                .addField('publicaciones', res.postsCount , true)//creamoos otro flied en la que entraremos a los datos y sacaremos los post que tiene el usuario
                .addField('Cuenta Reciente', TrueFalse[res.isRecentUser] , true)//esto devolvera si la cuenta se creo hace poco devolvera true o falso para eso isimos una varible con la que solo envse de true / false pondremos Si / no
                .addField('Cuenta Privada', TrueFalse[res.isPrivate] , true)//creamos otra field en la que pondremos si la cuenta es privada y como hisimos con arriba enves de true / false  ponemos Si / No
                .addField('Cuenta Verificada', TrueFalse[res.isVerified],true)//haora creamos otra field en la que devolveremos si la cuenta es privada en true / false que con nuestra variable TrueFalse cambiaremos a por Si / No
                .addField('biografia', res.biography)//agregamos otro field en la que sacaremos la biografia 
                msg.edit(embed)// y editamos el anterior mensaje por nuestro embed
            }).catch(error =>{//en caso algo salga mal como que no encuentre al usuario returnamos lo siguiente
                return message.channel.send('perdon no encontre al usuario intentelo de nuevo')
            })//ponemos un mensaje que no encontro al usuario y cerramos
        })//cerramos
            }
    
    const discord = require('discord.js');

    if(cmd === "unlock") {
      const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
var permisosUnlock = message.member.hasPermission('ADMINISTRATOR');
if (!permisosUnlock) return message.channel.send('❌ | No tienes permisos para ejecutar este comando.');

let channelUnlock = message.mentions.channels.first() || message.channel;
let rolstaffA = message.guild.roles.cache.find(rolstaffA => rolstaffA.id === 'ID_ROL');
let alluserA = message.guild.roles.cache.find(aus => aus.name === '@everyone');

if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('❌ | No tienes permisos para ejecutar este comando.');

channelUnlock.updateOverwrite(alluserA, {
  READ_MESSAGE_HISTORY: true,
  SEND_MESSAGES: true,
  ADD_REACTIONS: true
});

channelUnlock.updateOverwrite(rolstaffA, {
  READ_MESSAGE_HISTORY: true,
  SEND_MESSAGES: true,
  ADD_REACTIONS: true
});


const embedUnlock = new Discord.MessageEmbed()
.setDescription('El canal ha sido desbloqueado')
.setColor('GREEN');
message.channel.send(embedUnlock)
}
if(cmd ==="avatar") {
  const db = require('megadb'); //Definimos db
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; //definimos user
   const avatar = new MessageEmbed()
   .setDescription('Está guapo el avatar de'+ user.username + 'acá abajo tienes como')
.setDescription(`[Descargar Avatar](${user.displayAvatarURL({
       format: 'png',
       dynamic: true
   })})`)
.setImage(user.displayAvatarURL({dynamic: true, size : 1024 }))
.setColor("RANDOM")
.setFooter(`Avatar de solicitado por: ${message.member.displayName}`);
message.channel.send(avatar)
 }
    });
      client.on("message", (message) => {
        if (message.content.startsWith("p!userping")){
            let ping = Math.floor(message.client.ping);
        message.channel.send("Cargando...").then(m => {
          m.edit({embed: {
            title: "Pong!:ping_pong: ",
            description: `Mensaje: **${Math.floor(
              m.createdTimestamp - Date.now()
            )}ms**, API: **${ping}ms**`
            }});
        });
    }
});
            client.on("message", message => {

              if (message.channel.type === "dm") {

            const channelId = '871866396416553020';
            const channel = client.channels.cache.get(channelId);


            const upembed = new Discord.MessageEmbed()
              .setTimestamp()
              .setTitle("Mensaje directo")
              .addField("Enviado por:", `<@${message.author.id}>`)
              .setColor("RANDOM")
              .addField("Mensaje: ", message.content)
              .setFooter("Mensaje enviado al MD de VAQUITA");


            channel.send(upembed)
          }
        });
        client.on('message', message => {
          var prefix = config.prefix;
          if(message.content.startsWith(prefix+"ban")){ 
            const db = require('megadb'); 
let blacklist = new db.crearDB('blacklist');
if(blacklist.tiene(message.author.id)) return message.channel.send('No puedes usar este comando, estás en la blacklist!')
    
message.delete();
  
let user = message.mentions.users.first(); 
const razon = args.slice(1).join(' '); 
  
var perms = message.member.hasPermission("BAN_MEMBERS"); 
if(!perms) return message.channel.send(":no_entry_sign: `Error` `|` No tienes Permisos para usar este comando."); 
  
if (message.mentions.users.size < 1) return message.reply(':no_entry_sign: `ERROR` `|` Debe mencionar a alguien.').catch(console.error); 
  
if(!razon) return message.channel.send(':no_entry_sign: `ERROR` `|` Escriba un razón'); 
  
if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.'); 

message.guild.member(user).ban({ reason: razon });
  const embed = new Discord.MessageEmbed() 
  .setTitle(`ATENCIÓN | Nuevo Baneo`)
  .setThumbnail(user.avatarURL)
  .addField("Usuario:", `${user}`)
  .addField("ID:", `${user.id}`)
  .addField("Razón:", `${razon}`)
  .addField("Mod/Admin:", `${message.author.tag}`)
  .setFooter(" VAQUITA BOT ✅| Sistema de Moderación", message.author.avatarURL)
  .setColor(0xff001e)
  message.channel.send(embed)
            }
        });
client.login(config.token);
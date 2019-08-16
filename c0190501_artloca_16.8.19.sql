-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 16-08-2019 a las 14:06:56
-- Versión del servidor: 5.6.31-log
-- Versión de PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `c0190501_artloca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kioskos`
--

CREATE TABLE `kioskos` (
  `id` int(10) NOT NULL,
  `titulo` varchar(250) NOT NULL DEFAULT '',
  `latitud` varchar(250) NOT NULL DEFAULT '',
  `longitud` varchar(250) NOT NULL DEFAULT '',
  `ubicacion_id` int(10) NOT NULL,
  `marker` varchar(250) NOT NULL DEFAULT '',
  `likes` int(250) NOT NULL,
  `data_titulo` varchar(250) NOT NULL DEFAULT '',
  `data_imagen` text NOT NULL,
  `data_tag` varchar(250) NOT NULL DEFAULT '',
  `data_resumen` text NOT NULL,
  `data_popup` int(10) NOT NULL DEFAULT '1',
  `data_video` text NOT NULL,
  `data_texto` text NOT NULL,
  `data_direccion` text NOT NULL,
  `data_imagenes` text NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `kioskos`
--

INSERT INTO `kioskos` (`id`, `titulo`, `latitud`, `longitud`, `ubicacion_id`, `marker`, `likes`, `data_titulo`, `data_imagen`, `data_tag`, `data_resumen`, `data_popup`, `data_video`, `data_texto`, `data_direccion`, `data_imagenes`, `fecha`) VALUES
(5, 'Di Cesare Karina Alejandra', '-34.676249', '-58.5829347', 2, 'marker-azul.png', 0, '', 'a:1:{i:0;s:20:\"sanjusto-despues.jpg\";}', 'Sam Greco (samelgreco)', 'Este trabajo de mural propone ensayos sobre investigación compositiva y estudios de color…', 1, '', 'Este trabajo de mural propone ensayos sobre investigación compositiva y estudios de color, la idea de romper con las formas clásicas de ensamblaje de la geometría pura, buscando mis propias formas de generar sombra, luz, volumen y efectos ópticos de 3D-', 'Ramón Falcón 3595 – SAN JUSTO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:18:\"sanjusto-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:20:\"sanjusto-despues.jpg\";}}', '2019-08-14'),
(6, 'Rojo Claudio Marcelo', '-34.5993362', '-58.5637138', 2, 'marker-amarillo.png', 0, '', 'a:1:{i:0;s:19:\"caseros-despues.jpg\";}', 'Sam Greco (samelgreco)', 'Este trabajo de mural propone ensayos sobre investigación compositiva y estudios de color.', 1, '', 'Este trabajo de mural propone ensayos sobre investigación compositiva y estudios de color, la idea de romper con las formas clásicas de ensamblaje de la geometría pura, buscando mis propias formas de generar sombra, luz, volumen y efectos ópticos de 3D-', 'Avda San Martin 1914 – CASEROS', 'a:2:{s:5:\"antes\";a:1:{i:0;s:17:\"caseros-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:19:\"caseros-despues.jpg\";}}', '2019-08-14'),
(7, 'Kiosco Bachu', '-36.8884379', ' -60.3375063', 2, 'marker-rojo.png', 0, '', 'a:1:{i:0;s:21:\"olavarria-despues.jpg\";}', 'Soledad Moisas (Solemoi)', 'Es parte de un trabajo que vengo realizando donde registro objetos de la vida cotidiana…', 1, '', 'Es parte de un trabajo que vengo realizando donde registro objetos de la vida cotidiana, y busco que cada uno se encuentre con su historia y conecte con la historia de otres.', 'Avda Ituzaingo 2398 – OLAVARRIA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:19:\"olavarria-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:21:\"olavarria-despues.jpg\";}}', '2019-08-14'),
(8, 'Sanchez Irma', '-34.7165829', '-58.3075069', 2, 'marker-amarillo.png', 0, '', 'a:1:{i:0;s:23:\"bernaloeste-despues.jpg\";}', 'Yessica García (Yessi Garcia)', '', 1, '', '', 'Avda Los Quilmes 1002 – BERNAL OESTE', 'a:2:{s:5:\"antes\";a:1:{i:0;s:21:\"bernaloeste-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:23:\"bernaloeste-despues.jpg\";}}', '2019-08-01'),
(9, 'Caceres Ezequiel', '-34.7196915', '-58.2573179', 2, 'marker-naranja.png', 0, 'Dónde estoy', 'a:1:{i:0;s:19:\"quilmes-despues.jpg\";}', 'Andrés Litvak', 'La obra busca descolocar al espectador al encontrarse con un animal ajeno a su cotidianidad en medio de la ciudad. ', 1, '', 'La obra busca descolocar al espectador al encontrarse con un animal ajeno a su cotidianidad en medio de la ciudad. Propone un cuestionamiento a la transformación de naturaleza salvaje en grandes ciudades', 'Mitre 544 – QUILMES', 'a:2:{s:5:\"antes\";a:1:{i:0;s:17:\"quilmes-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:19:\"quilmes-despues.jpg\";}}', '2019-08-01'),
(10, 'Rodolfo Rennee Bonifacio', '-34.5797465', '-58.4369539', 1, 'marker-violeta.png', 0, '', 'a:1:{i:0;s:19:\"palermo-despues.jpg\";}', 'Ismael Marinato (inato)', 'La intervención busca traer la naturaleza a la urbe y a su vez descontextualizar la misma…', 1, '', 'La intervención busca traer la naturaleza a la urbe y a su vez descontextualizar la misma para invitar a la reflexión sobre como nuestra existencia y desarrollo la afecta y la modifica', 'Fitz Roy 2117 – PALERMO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:17:\"palermo-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:19:\"palermo-despues.jpg\";}}', '2019-08-01'),
(11, 'Casella Ricardo Jorge', '-34.6257591', '-58.4712641', 1, 'marker-turqueza.png', 2, 'Avé Fenix', 'a:1:{i:0;s:21:\"caballito-despues.jpg\";}', 'Javier López Galvan (Toto Ilustrador)', 'El Fenix es un ave sanadora y por sobre todas las cosas transformadora...', 1, '', 'El Fenix es un ave sanadora y por sobre todas las cosas transformadora, que surge de sus propias cenizas, teniendo al fuego como elemento principal y poderoso, símbolo de fortaleza esperanza, y transformación.', 'Avellaneda 2724 – CABALLITO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:19:\"caballito-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:21:\"caballito-despues.jpg\";}}', '2019-08-01'),
(12, 'Beros Sergio', '-34.5746266', '-58.5006237', 1, 'marker-verde.png', 0, 'Transformación', 'a:1:{i:0;s:19:\"urquiza-despues.jpg\";}', 'Magdalena Ehul Ayerza (Male Ehul)', 'La serpiente, para diferentes culturas, es el símbolo espiritual y esotérico de la transformación...', 1, '', 'La serpiente, para diferentes culturas, es el símbolo espiritual y esotérico de la transformación. Además las plantas indican vida y florecimiento. Por otro lado, el jarrón invita a conservar aquello que se aprecia, haciendo que lo viejo y lo nuevo convivan en armonía. Transformar y dejar ir lo viejo para que lo nuevo llegue con alegría.', 'Monroe 5229 – URQUIZA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:17:\"urquiza-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:19:\"urquiza-despues.jpg\";}}', '2019-08-01'),
(13, 'Seiler Antonia Mari', '-34.5952613', '-58.6494059', 2, 'marker-rojo.png', 0, '', 'a:1:{i:0;s:22:\"hurlingham-despues.jpg\";}', 'Nicolás Valeiras (Nikov)', '', 1, '', '', 'Jose Bustamante y Guevara 1902 – HURLINGHAM', 'a:2:{s:5:\"antes\";a:1:{i:0;s:20:\"hurlingham-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:22:\"hurlingham-despues.jpg\";}}', '2019-08-01'),
(14, 'Ruartes Julio Javier', '-35.5768292', '-58.0087402', 2, 'marker-amarillo.png', 0, 'Plantas de Chascomús', 'a:1:{i:0;s:21:\"chascomus-despues.jpg\";}', 'Pedro Arteaga (El Pit)', 'Una combinación de colores y formas naturales que crean un espacio atractivo para el ambiente callejero.', 1, '', 'Una combinación de colores y formas naturales que crean un espacio atractivo para el ambiente callejero.', 'Avda Lastra 500 – CHASCOMUS', 'a:2:{s:5:\"antes\";a:1:{i:0;s:19:\"chascomus-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:21:\"chascomus-despues.jpg\";}}', '2019-08-01'),
(15, 'Castrovinci Luis Alberto', '-34.5963203', '-58.501262', 1, 'marker-naranja.png', 1, 'Flora', 'a:1:{i:0;s:17:\"beiro-despues.jpg\";}', 'Toia Grehan', 'En esta pintura se crea un ecosistemas imaginarios donde el espacio naturale dialoga con el paisaje urbano.', 1, '', 'En esta pintura se crea un ecosistemas imaginarios donde el espacio naturale que aparece pictóricamente dialoga con el paisaje urbano y sus elementos naturales a través del color y el ritmo. El resultado es la transformación de los recorridos visuales cotidianos y una invitación a la contemplación.', 'Avda Francisco Beiro 3207 - AGRONOMÍA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:15:\"beiro-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:17:\"beiro-despues.jpg\";}}', '2019-08-07'),
(16, 'Estaciones', '-34.6036557', '-58.4292316', 1, 'marker-amarillo.png', 0, 'Estaciones', 'a:1:{i:0;s:18:\"gascon-despues.jpg\";}', 'Federico Iván Raichensztein (Rangraf)', ' El cambio constante de las estaciones en ciclos infinitos, que generan naturalmente colores complementarios.', 1, '', 'El cambio constante de las estaciones en ciclos infinitos, que generan naturalmente colores complementarios. La creación y la destrucción, dos caras de una misma moneda, ambas siempre llevando aparejado a su opuesto.', 'Gascon 897 - ALMAGRO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:16:\"gascon-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:18:\"gascon-despues.jpg\";}}', '2019-08-15'),
(17, 'El camaleón', '-34.5746287', '-58.4226957', 1, 'marker-rojo.png', 0, 'El camaleón', 'a:1:{i:0;s:21:\"frayjusto-despues.jpg\";}', 'Lautaro Machaca', 'Las transformaciones muchas veces nos hacen mejorar, o simplemente adaptarnos al lugar donde estamos.', 1, '', 'Las transformaciones muchas veces nos hacen mejorar, o simplemente adaptarnos al lugar donde estamos. Los colores transforman, no solo por fuera.', 'Fray Justo María Oro 2938 - CABA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:19:\"frayjusto-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:21:\"frayjusto-despues.jpg\";}}', '2019-08-15'),
(18, 'Sapo viajero', '-37.3237438', '-59.1355923', 2, 'marker-turqueza.png', 0, 'Sapo viajero', 'a:1:{i:0;s:21:\"sarmiento-despues.jpg\";}', 'Lucas Moleker (Smoko)', 'Vive la vida despreocupado y sin obligaciones, observando lo que lo rodea, y planeando su próximo destino.', 1, '', 'Vive la vida despreocupado y sin obligaciones, observando lo que lo rodea, y planeando su próximo destino.', 'Sarmiento 871 - TANDIL', 'a:2:{s:5:\"antes\";a:0:{}s:7:\"despues\";a:1:{i:0;s:21:\"sarmiento-despues.jpg\";}}', '2019-08-12'),
(19, 'Colorido atardecer', '-24.1842451', '-65.3205533', 3, 'marker-violeta.png', 0, 'Colorido atardecer', 'a:1:{i:0;s:22:\"ariasjujuy-despues.jpg\";}', 'Ruth Zapana', 'El reflejo de los rayos del sol, posándose tranquilamente sobre el Cerro de Siete Colores.', 1, '', 'El reflejo de los rayos del sol, posándose tranquilamente sobre el Cerro de Siete Colores. El devenir de los días, siempre igual, siempre cambiante.', 'Cnel. Arias 798 - JUJUY', 'a:2:{s:5:\"antes\";a:1:{i:0;s:20:\"ariasjujuy-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:22:\"ariasjujuy-despues.jpg\";}}', '2019-08-12'),
(20, 'Abrir en nueva ventana', '-34.6089429', '-58.3804337', 1, 'marker-naranja.png', 0, 'Abrir en nueva ventana', 'a:1:{i:0;s:22:\"avmayocaba-despues.jpg\";}', 'Lina', 'Homenaje al Chaltén, a la noche, la lluvia, el bosque y los gatos.', 1, '', 'Homenaje al Chaltén, a la noche, la lluvia, el bosque y los gatos — en breve, a cosas más lindas que hay.', 'Avda de Mayo 834 - CABA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:20:\"avmayocaba-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:22:\"avmayocaba-despues.jpg\";}}', '2019-08-12'),
(21, 'Next level', '-38.923722', '-67.996846', 5, 'marker-violeta.png', 0, 'Next level', 'a:1:{i:0;s:28:\"arenalesrionegro-despues.jpg\";}', 'Ali Ble', 'La obra hace referencia a la búsqueda de fusionar diferentes estilos.', 1, '', 'La obra hace referencia a la búsqueda de fusionar diferentes estilos, jugando con las letras, personajes y efectos para crear algo abstracto, original, divertido y distinto a lo que venía haciendo en graffitis anteriores.', 'Arenales 77 – RIO NEGRO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:26:\"arenalesrionegro-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:28:\"arenalesrionegro-despues.jpg\";}}', '2019-08-12'),
(22, 'Portales', '-27.5753079', '-60.7090441', 6, 'marker-violeta.png', 1, 'Portales', 'a:1:{i:0;s:27:\"echeverriachaco-despues.jpg\";}', 'Gabriela Aguado', 'El eterno portador de los mensajes del universo, atravesando las diferentes dimensiones del entendimiento.', 1, '', 'El eterno portador de los mensajes del universo, atravesando las diferentes dimensiones del entendimiento, llega a nosotros como un susurro ancestral para guiarnos hacia el camino de la trascendencia.', 'Echeverría 401 - CHACO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:25:\"echeverriachaco-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:27:\"echeverriachaco-despues.jpg\";}}', '2019-08-12'),
(23, 'Volar nos renueva', '-31.4128934', '-64.1885178', 4, 'marker-violeta.png', 2, 'Volar nos renueva', 'a:1:{i:0;s:24:\"coloncordoba-despues.jpg\";}', 'Noel Abalos', 'Permitirnos abrir las alas y tomar vuelo nos transporta a nuevos sitios.', 1, '', 'Permitirnos abrir las alas y tomar vuelo nos transporta a nuevos sitios. Nos lleva a nuevos destinos, donde podemos transformarnos en el camino y crecer e ir más lejos hacia un horizonte más placentero, hacia donde nuestra imaginación nos haga viajar.', 'Av Colón 229 - CORDOBA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:22:\"coloncordoba-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:24:\"coloncordoba-despues.jpg\";}}', '2019-08-12'),
(24, 'ExpandeFlora', '-34.648912', '-58.621723', 2, 'marker-violeta.png', 2, 'ExpandeFlora...', 'a:1:{i:0;s:28:\"schvarzbergmoron-despues.jpg\";}', 'Cristian Kave', 'La capacidad de expansión de la naturaleza superará siempre nuestras expectativas.', 1, '', 'La capacidad de expansión de la naturaleza superará siempre nuestras expectativas, aún en estos tiempos de conexiones tecnológicas, redes sociales y pantallas HD. La flora busca expandirse en una carrera contra el cambio climático, contra lo oscuro del fondo.', 'Bernardo Schvarzberg 786 - MORON', 'a:2:{s:5:\"antes\";a:1:{i:0;s:26:\"schvarzbergmoron-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:28:\"schvarzbergmoron-despues.jpg\";}}', '2019-08-12'),
(25, 'Enlazados', '-34.6080681', '-58.3786004', 1, 'marker-turqueza.png', 3, 'Enlazados', 'a:1:{i:0;s:21:\"maipucaba-despues.jpg\";}', 'Lala gg', 'Dos manos se rozan, sienten energía que circula al hacer contacto.', 1, '', 'Dos manos se rozan, sienten energía que circula al hacer contacto. Un movimiento torpe entre los dedos ensayan la forma de quedar enlazados. Vínculos colorean nuestras vidas. Vínculos divertidos. Vínculos en la diversidad. Vínculos con respeto.', 'Maipú 4 - CABA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:19:\"maipucaba-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:21:\"maipucaba-despues.jpg\";}}', '2019-08-16'),
(26, 'Yaguareté', '-34.6154236', '-58.3764727', 1, 'marker-violeta.png', 2, 'Yaguareté', 'a:1:{i:0;s:20:\"perucaba-despues.jpg\";}', 'Fa UnoArt', 'Esta obra demuestra el afecto que tengo por el Amazonas, su fauna y su flora.', 1, '', 'Esta obra demuestra el afecto que tengo por el Amazonas, su fauna y su flora.', 'Perú 650 - CABA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:18:\"perucaba-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:20:\"perucaba-despues.jpg\";}}', '2019-08-16'),
(27, 'El rugido en la mirada', '-34.605715', '-58.3815995', 1, 'marker-amarillo.png', 1, 'El rugido en la mirada', 'a:1:{i:0;s:24:\"suipachacaba-despues.jpg\";}', 'Julián Cruz Solano ', 'Secretos que debemos aprender de los animales, están guardados en la pupila así como la memoria de la tierra guardada en la retina.', 1, '', 'Secretos que debemos aprender de los animales, están guardados en la pupila así como la memoria de la tierra guardada en la retina.', 'Suipacha 232 - CABA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:22:\"suipachacaba-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:24:\"suipachacaba-despues.jpg\";}}', '2019-08-16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `id` int(10) NOT NULL,
  `slug` varchar(250) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `latitud` varchar(250) NOT NULL,
  `longitud` varchar(250) NOT NULL,
  `zoom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ubicaciones`
--

INSERT INTO `ubicaciones` (`id`, `slug`, `titulo`, `latitud`, `longitud`, `zoom`) VALUES
(1, 'caba', 'Capital Federal', '-34.591444', '-58.428068', '12'),
(2, 'bsas', 'Buenos Aires', '-36.1283396', '-59.179785', '7'),
(3, 'jujuy', 'Jujuy', '-23.736663', '-65.9630215', '7'),
(4, 'cda', 'Cordoba', '-31.3730326', '-64.2281071', '7'),
(5, 'rionegro', 'Río Negro', '-38.7649148', '-66.9989595', '7'),
(6, 'chaco', 'Chaco', '-27.5817393', '-60.8146441', '7');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `kioskos`
--
ALTER TABLE `kioskos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `kioskos`
--
ALTER TABLE `kioskos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-08-2019 a las 18:29:03
-- Versión del servidor: 5.7.25-0ubuntu0.18.04.2
-- Versión de PHP: 7.3.7-1+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `artlocator`
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
(5, 'Di Cesare Karina Alejandra', '-34.676249', '-58.5829347', 2, 'marker-azul.png', 0, '', 'a:1:{i:0;s:20:\"sanjusto-despues.jpg\";}', 'Sam Greco (samelgreco)', 'Este trabajo de mural propone ensayos sobre investigación compositiva y estudios de color…', 1, '', 'Este trabajo de mural propone ensayos sobre investigación compositiva y estudios de color, la idea de romper con las formas clásicas de ensamblaje de la geometría pura, buscando mis propias formas de generar sombra, luz, volumen y efectos ópticos de 3D-', 'Ramón Falcón 3595 – SAN JUSTO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:18:\"sanjusto-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:20:\"sanjusto-despues.jpg\";}}', '2019-08-01'),
(6, 'Rojo Claudio Marcelo', '-34.5993362', '-58.5637138', 2, 'marker-amarillo.png', 0, '', 'a:1:{i:0;s:19:\"caseros-despues.jpg\";}', 'Sam Greco (samelgreco)', 'Este trabajo de mural propone ensayos sobre investigación compositiva y estudios de color.', 1, '', 'Este trabajo de mural propone ensayos sobre investigación compositiva y estudios de color, la idea de romper con las formas clásicas de ensamblaje de la geometría pura, buscando mis propias formas de generar sombra, luz, volumen y efectos ópticos de 3D-', 'Avda San Martin 1914 – CASEROS', 'a:2:{s:5:\"antes\";a:1:{i:0;s:17:\"caseros-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:19:\"caseros-despues.jpg\";}}', '2019-08-01'),
(7, 'Kiosco Bachu', '-36.8884379', ' -60.3375063', 2, 'marker-rojo.png', 0, '', 'a:1:{i:0;s:21:\"olavarria-despues.jpg\";}', 'Soledad Moisas (Solemoi)', 'Es parte de un trabajo que vengo realizando donde registro objetos de la vida cotidiana…', 1, '', 'Es parte de un trabajo que vengo realizando donde registro objetos de la vida cotidiana, y busco que cada uno se encuentre con su historia y conecte con la historia de otres.', 'Avda Ituzaingo 2398 – OLAVARRIA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:19:\"olavarria-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:21:\"olavarria-despues.jpg\";}}', '2019-08-01'),
(8, 'Sanchez Irma', '-34.7165829', '-58.3075069', 2, 'marker-amarillo.png', 0, '', 'a:1:{i:0;s:23:\"bernaloeste-despues.jpg\";}', 'Yessica García (Yessi Garcia)', '', 1, '', '', 'Avda Los Quilmes 1002 – BERNAL OESTE', 'a:2:{s:5:\"antes\";a:1:{i:0;s:21:\"bernaloeste-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:23:\"bernaloeste-despues.jpg\";}}', '2019-08-01'),
(9, 'Caceres Ezequiel', '-34.7196915', '-58.2573179', 2, 'marker-naranja.png', 0, 'Dónde estoy', 'a:1:{i:0;s:19:\"quilmes-despues.jpg\";}', 'Andrés Litvak', 'La obra busca descolocar al espectador al encontrarse con un animal ajeno a su cotidianidad en medio de la ciudad. ', 1, '', 'La obra busca descolocar al espectador al encontrarse con un animal ajeno a su cotidianidad en medio de la ciudad. Propone un cuestionamiento a la transformación de naturaleza salvaje en grandes ciudades', 'Mitre 544 – QUILMES', 'a:2:{s:5:\"antes\";a:1:{i:0;s:17:\"quilmes-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:19:\"quilmes-despues.jpg\";}}', '2019-08-01'),
(10, 'Rodolfo Rennee Bonifacio', '-34.5797465', '-58.4369539', 1, 'marker-violeta.png', 0, '', 'a:1:{i:0;s:19:\"palermo-despues.jpg\";}', 'Ismael Marinato (inato)', 'La intervención busca traer la naturaleza a la urbe y a su vez descontextualizar la misma…', 1, '', 'La intervención busca traer la naturaleza a la urbe y a su vez descontextualizar la misma para invitar a la reflexión sobre como nuestra existencia y desarrollo la afecta y la modifica', 'Fitz Roy 2117 – PALERMO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:17:\"palermo-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:19:\"palermo-despues.jpg\";}}', '2019-08-01'),
(11, 'Casella Ricardo Jorge', '-34.6257591', '-58.4712641', 1, 'marker-turqueza.png', 0, 'Avé Fenix', 'a:1:{i:0;s:21:\"caballito-despues.jpg\";}', 'Javier López Galvan (Toto Ilustrador)', 'El Fenix es un ave sanadora y por sobre todas las cosas transformadora...', 1, '', 'El Fenix es un ave sanadora y por sobre todas las cosas transformadora, que surge de sus propias cenizas, teniendo al fuego como elemento principal y poderoso, símbolo de fortaleza esperanza, y transformación.', 'Avellaneda 2724 – CABALLITO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:19:\"caballito-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:21:\"caballito-despues.jpg\";}}', '2019-08-01'),
(12, 'Beros Sergio', '-34.5746266', '-58.5006237', 1, 'marker-verde.png', 0, 'Transformación', 'a:1:{i:0;s:19:\"urquiza-despues.jpg\";}', 'Magdalena Ehul Ayerza (Male Ehul)', 'La serpiente, para diferentes culturas, es el símbolo espiritual y esotérico de la transformación...', 1, '', 'La serpiente, para diferentes culturas, es el símbolo espiritual y esotérico de la transformación. Además las plantas indican vida y florecimiento. Por otro lado, el jarrón invita a conservar aquello que se aprecia, haciendo que lo viejo y lo nuevo convivan en armonía. Transformar y dejar ir lo viejo para que lo nuevo llegue con alegría.', 'Monroe 5229 – URQUIZA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:17:\"urquiza-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:19:\"urquiza-despues.jpg\";}}', '2019-08-01'),
(13, 'Seiler Antonia Mari', '-34.5952613', '-58.6494059', 2, 'marker-rojo.png', 0, '', 'a:1:{i:0;s:22:\"hurlingham-despues.jpg\";}', 'Nicolás Valeiras (Nikov)', '', 1, '', '', 'Jose Bustamante y Guevara 1902 – HURLINGHAM', 'a:2:{s:5:\"antes\";a:1:{i:0;s:20:\"hurlingham-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:22:\"hurlingham-despues.jpg\";}}', '2019-08-01'),
(14, 'Ruartes Julio Javier', '-35.5768292', '-58.0087402', 2, 'marker-amarillo.png', 0, 'Plantas de Chascomús', 'a:1:{i:0;s:21:\"chascomus-despues.jpg\";}', 'Pedro Arteaga (El Pit)', 'Una combinación de colores y formas naturales que crean un espacio atractivo para el ambiente callejero.', 1, '', 'Una combinación de colores y formas naturales que crean un espacio atractivo para el ambiente callejero.', 'Avda Lastra 500 – CHASCOMUS', 'a:2:{s:5:\"antes\";a:1:{i:0;s:19:\"chascomus-antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:21:\"chascomus-despues.jpg\";}}', '2019-08-01');

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
(2, 'bsas', 'Buenos Aires', '-35.8832113', '-59.179785', '7'),
(3, 'stfe', 'Santa Fe', '', '', '');

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

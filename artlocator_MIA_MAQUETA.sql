-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-08-2019 a las 12:56:33
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
(1, 'Ciudad de Buenos Aires', '-34.6078603', '-58.383111', 1, 'marker-amarillo.png', 1006, 'MARTE (Argentina)', 'a:3:{i:0;s:12:\"muestra1.jpg\";i:1;s:15:\"muestra1@2x.jpg\";i:2;s:15:\"muestra1@3x.jpg\";}', '@marte_', 'In efforts to expand our horizons, we welcome every investment-minded individual to join us.', 1, 'a:1:{i:0;s:9:\"movie.mp4\";}', 'Hola, Soy Marte! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Gorriti 5043 - PALERMO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:9:\"antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:11:\"despues.jpg\";}}', '2019-07-27'),
(2, 'La Plata', '-34.9205233', '-57.9881898', 2, 'marker-azul.png', 326, 'SATURNO (Argentina)', 'a:1:{i:0;s:20:\"imagen-destacada.png\";}', '@saturno_', 'In efforts to expand our horizons, we welcome every investment-minded individual to join us.', 1, '', 'Hola, Soy Saturno! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Gorriti 5043 - ENSENADA', '', '2019-07-19'),
(3, 'Rosario', '-32.9521898', '-60.7666797', 3, 'marker-naranja.png', 62, 'JUPITER (Argentina)', 'a:3:{i:0;s:12:\"muestra1.jpg\";i:1;s:15:\"muestra1@2x.jpg\";i:2;s:15:\"muestra1@3x.jpg\";}', '@jupiter_', 'In efforts to expand our horizons, we welcome every investment-minded individual to join us.', 1, 'a:1:{i:0;s:9:\"movie.mp4\";}', 'Hola, Soy Jupiter! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Gorriti 5043 - ROSARIO', 'a:2:{s:5:\"antes\";a:1:{i:0;s:9:\"antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:11:\"despues.jpg\";}}', '2019-07-21'),
(4, 'Mar del Plata', '-38.0174836', '-57.7406185', 2, 'marker-verde.png', 0, 'VENUS (Argentina)', 'a:3:{i:0;s:12:\"muestra1.jpg\";i:1;s:15:\"muestra1@2x.jpg\";i:2;s:15:\"muestra1@3x.jpg\";}', '@venus_', 'In efforts to expand our horizons, we welcome every investment-minded individual to join us.', 1, 'a:1:{i:0;s:9:\"movie.mp4\";}', 'Hola, Soy Venus! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Gorriti 5043 - MAR DEL PLATA', 'a:2:{s:5:\"antes\";a:1:{i:0;s:9:\"antes.jpg\";}s:7:\"despues\";a:1:{i:0;s:11:\"despues.jpg\";}}', '2019-07-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `id` int(10) NOT NULL,
  `slug` varchar(250) NOT NULL,
  `titulo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ubicaciones`
--

INSERT INTO `ubicaciones` (`id`, `slug`, `titulo`) VALUES
(1, 'caba', 'Capital Federal'),
(2, 'bsas', 'Buenos Aires'),
(3, 'stfe', 'Santa Fe');

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE SCHEMA IF NOT EXISTS `sample` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

USE sample;

CREATE TABLE `t_user` (
  `id` varchar(64) NOT NULL,
  `userid` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `creator` varchar(45) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `updator` varchar(45) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `active` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
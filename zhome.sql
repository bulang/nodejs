/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : zhome

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-03-26 20:31:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for zh_control
-- ----------------------------
DROP TABLE IF EXISTS `zh_control`;
CREATE TABLE `zh_control` (
  `control_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主机的遥控列表',
  `control_card` varchar(255) DEFAULT NULL COMMENT '遥控地址',
  `zh_homes_id` int(11) DEFAULT NULL COMMENT '关联的主机id',
  `house_id` int(11) DEFAULT NULL COMMENT '房间id',
  `addtime` int(11) DEFAULT NULL COMMENT '添加时间',
  `control_icon` varchar(255) DEFAULT NULL COMMENT '控制器的图标',
  PRIMARY KEY (`control_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zh_control
-- ----------------------------

-- ----------------------------
-- Table structure for zh_homes
-- ----------------------------
DROP TABLE IF EXISTS `zh_homes`;
CREATE TABLE `zh_homes` (
  `zh_homes_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户的主机列表',
  `zh_home_card` varchar(255) DEFAULT NULL COMMENT '主机的唯一id',
  `u_id` int(11) DEFAULT NULL COMMENT '关联的用户id',
  `addtime` int(11) DEFAULT NULL COMMENT '添加时间',
  `home_icon` varchar(255) DEFAULT NULL COMMENT '主机的图标',
  PRIMARY KEY (`zh_homes_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zh_homes
-- ----------------------------

-- ----------------------------
-- Table structure for zh_houses
-- ----------------------------
DROP TABLE IF EXISTS `zh_houses`;
CREATE TABLE `zh_houses` (
  `house_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '房间列表',
  `house_name` varchar(255) DEFAULT NULL COMMENT '房间名',
  `addtime` int(11) DEFAULT NULL COMMENT '添加时间',
  `house_icon` varchar(255) DEFAULT NULL COMMENT '房间的图片',
  `zh_homes_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`house_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zh_houses
-- ----------------------------

-- ----------------------------
-- Table structure for zh_users
-- ----------------------------
DROP TABLE IF EXISTS `zh_users`;
CREATE TABLE `zh_users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户表的主键id',
  `u_num` varchar(255) DEFAULT NULL COMMENT '用户的账号',
  `u_pass` varchar(255) DEFAULT NULL COMMENT '用户的密码',
  `addtime` int(11) DEFAULT NULL COMMENT '用户的注册时间',
  `state` int(4) DEFAULT '1' COMMENT '用户的状态',
  PRIMARY KEY (`u_id`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zh_users
-- ----------------------------
INSERT INTO `zh_users` VALUES ('32', '18335908008', 'e10adc3949ba59abbe56e057f20f883e', '1522064498', '1');
INSERT INTO `zh_users` VALUES ('33', '18335908001', 'e10adc3949ba59abbe56e057f20f883e', '1522065707', '1');
INSERT INTO `zh_users` VALUES ('34', '18335908002', 'e10adc3949ba59abbe56e057f20f883e', '1522066233', '1');
INSERT INTO `zh_users` VALUES ('35', '18335908003', 'e10adc3949ba59abbe56e057f20f883e', '1522067174', '1');
INSERT INTO `zh_users` VALUES ('31', '18335908007', '71b3b26aaa319e0cdf6fdb8429c112b0', '1522063676', '1');

-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.8.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for piivt_app
DROP DATABASE IF EXISTS `piivt_app`;
CREATE DATABASE IF NOT EXISTS `piivt_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `piivt_app`;

-- Dumping structure for table piivt_app.cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `item_id` int(11) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `special_notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user_id` (`user_id`),
  KEY `fk_cart_item_id` (`item_id`),
  CONSTRAINT `fk_cart_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table piivt_app.cart: ~5 rows (approximately)
INSERT INTO `cart` (`cart_id`, `user_id`, `item_id`, `quantity`, `special_notes`) VALUES
	(1, 1, 2, 2, 'Add extra cheese'),
	(2, 2, 3, 3, NULL),
	(3, 3, 1, 1, 'Lightly toasted English muffin'),
	(4, 3, 4, 1, 'No tomatoes'),
	(5, 1, 2, 2, 'Add extra cheese');

-- Dumping structure for table piivt_app.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`) USING BTREE,
  UNIQUE KEY `uq_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table piivt_app.category: ~7 rows (approximately)
INSERT INTO `category` (`category_id`, `name`) VALUES
	(14, 'Barbecue'),
	(1, 'Breakfast'),
	(11, 'Cooked meals'),
	(22, 'Deserts'),
	(15, 'Salads'),
	(12, 'Seafood'),
	(13, 'Starters');

-- Dumping structure for table piivt_app.item
DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `item_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  `category_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`item_id`) USING BTREE,
  UNIQUE KEY `uq_items_name` (`name`),
  KEY `fk_item_category_id` (`category_id`),
  CONSTRAINT `fk_item_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table piivt_app.item: ~10 rows (approximately)
INSERT INTO `item` (`item_id`, `name`, `content`, `quantity`, `price`, `category_id`) VALUES
	(1, 'Eggs Benedict', 'English muffin, ham, eggs, hollandaise sauce', 1, 10, 1),
	(2, 'Pancakes', 'Fluffy pancakes with syrup and butter', 1, 8, 22),
	(3, 'Omelette', 'Three-egg omelette with cheese, mushrooms and ham', 1, 12, 1),
	(4, 'Grilled salmon', 'Fresh salmon grilled to perfection', 1, 20, 12),
	(5, 'Lobster bisque', 'Creamy lobster soup', 1, 14, 12),
	(6, 'Crab cakes', 'Pan-fried crab cakes', 2, 16, 12),
	(7, 'Caprese salad', 'Mozzarella, tomatoes, basil, balsamic glaze', 1, 10, 15),
	(8, 'Greek salad', 'Feta cheese, olives, tomatoes, cucumbers, red onions, lemon dressing', 1, 12, 15),
	(9, 'Caesar salad', 'Romaine lettuce, croutons, parmesan cheese, Caesar dressing', 1, 10, 15),
	(10, 'Spinach salad', 'Baby spinach, strawberries, pecans, balsamic vinaigrette', 1, 12, 15);

-- Dumping structure for table piivt_app.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `orders_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) unsigned NOT NULL,
  `postal_adress_id` int(11) unsigned NOT NULL,
  `servings` int(11) NOT NULL,
  `item_description` text NOT NULL,
  `order_description` text NOT NULL,
  `delivery_time` datetime NOT NULL,
  `status` enum('created','accepted','completed') NOT NULL,
  `rating` enum('1','2','3','4','5') DEFAULT NULL,
  `note` text DEFAULT NULL,
  PRIMARY KEY (`orders_id`) USING BTREE,
  UNIQUE KEY `uq_oreders_cart_id` (`cart_id`),
  KEY `fk_orders_menu_item_id` (`postal_adress_id`) USING BTREE,
  KEY `fk_orders_user_id` (`cart_id`) USING BTREE,
  CONSTRAINT `FK_orders_cart` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_orders_postal_addresses` FOREIGN KEY (`postal_adress_id`) REFERENCES `postal_address` (`postal_address_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table piivt_app.order: ~5 rows (approximately)
INSERT INTO `order` (`orders_id`, `cart_id`, `postal_adress_id`, `servings`, `item_description`, `order_description`, `delivery_time`, `status`, `rating`, `note`) VALUES
	(16, 1, 6, 2, 'Cheese Pizza', 'Two large cheese pizzas', '2022-12-25 12:00:00', 'created', '5', 'Please make sure pizzas are extra cheesy'),
	(17, 2, 7, 4, 'Fried Chicken', 'Four pieces of fried chicken', '2022-12-26 14:00:00', 'accepted', '4', 'Add extra hot sauce'),
	(18, 3, 7, 1, 'Veggie Burger', 'One veggie burger with avocado', '2022-12-27 16:00:00', 'completed', '3', 'No pickles please'),
	(19, 4, 8, 6, 'Spaghetti Bolognese', 'Six portions of spaghetti with meat sauce', '2022-12-28 18:00:00', 'created', '4', 'Add extra parmesan cheese'),
	(20, 5, 8, 3, 'Vegetable Stir Fry', 'Three portions of vegetable stir fry', '2022-12-29 20:00:00', 'accepted', '5', 'Add extra tofu');

-- Dumping structure for table piivt_app.order_history
DROP TABLE IF EXISTS `order_history`;
CREATE TABLE IF NOT EXISTS `order_history` (
  `order_history_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) unsigned NOT NULL,
  `admin_note` text DEFAULT NULL,
  `cooperation_indicator` enum('correct','demanding','problematic','cooperation not recommended','impersonation') NOT NULL,
  PRIMARY KEY (`order_history_id`) USING BTREE,
  KEY `fk_order_history_order_id` (`order_id`),
  CONSTRAINT `fk_order_history_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`orders_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table piivt_app.order_history: ~5 rows (approximately)
INSERT INTO `order_history` (`order_history_id`, `order_id`, `admin_note`, `cooperation_indicator`) VALUES
	(1, 16, 'Order was placed on time and delivered on time', 'correct'),
	(2, 17, 'Customer was demanding but order was completed as requested', 'demanding'),
	(3, 18, 'Customer had an issue with the order, resolved with a refund', 'problematic'),
	(4, 19, 'Customer was uncooperative, will not be serving in future', 'cooperation not recommended'),
	(5, 20, 'Suspected impersonation, will be investigating further', 'impersonation');

-- Dumping structure for table piivt_app.photo
DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(11) unsigned NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `is_featured` tinyint(1) NOT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `fk_photos_item_id` (`item_id`),
  CONSTRAINT `fk_photos_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table piivt_app.photo: ~5 rows (approximately)
INSERT INTO `photo` (`photo_id`, `item_id`, `photo_url`, `is_featured`) VALUES
	(1, 1, 'https://example.com/photos/1.jpg', 1),
	(2, 2, 'https://example.com/photos/2.jpg', 0),
	(3, 3, 'https://example.com/photos/3.jpg', 1),
	(4, 4, 'https://example.com/photos/4.jpg', 0),
	(5, 5, 'https://example.com/photos/5.jpg', 1);

-- Dumping structure for table piivt_app.postal_address
DROP TABLE IF EXISTS `postal_address`;
CREATE TABLE IF NOT EXISTS `postal_address` (
  `postal_address_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `address` text NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  PRIMARY KEY (`postal_address_id`) USING BTREE,
  KEY `fk_postal_addresses_user_id` (`user_id`),
  CONSTRAINT `fk_postal_addresses_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table piivt_app.postal_address: ~3 rows (approximately)
INSERT INTO `postal_address` (`postal_address_id`, `user_id`, `address`, `phone_number`) VALUES
	(6, 1, '123 Main St, Springfield, IL 62704', '555-555-5555'),
	(7, 2, '456 Elm St, Springfield, IL 62704', '555-555-5556'),
	(8, 3, '789 Oak St, Springfield, IL 62704', '555-555-5557');

-- Dumping structure for table piivt_app.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password_hash` varchar(64) NOT NULL,
  `role` enum('administrator','user') NOT NULL,
  `is_active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `uq_user_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table piivt_app.user: ~3 rows (approximately)
INSERT INTO `user` (`user_id`, `username`, `password_hash`, `role`, `is_active`) VALUES
	(1, 'user1', '$2b$10$BEEP38MBOzMdKZ9UVMSyv.H7c4jMAQ8xgYI8TsTE/ib16tNLgJ0EK', 'administrator', 1),
	(2, 'user2', '$2b$10$7OBaKW6y6Rih/bSlyv9guejkwSumULZfs.8iTveQfRW/nkAii/p1m', 'user', 1),
	(3, 'user3', '$2b$10$zN/7fjPvY9P7R/aNlx1w/OsJgAtR6UjSG6UzJ6No1T6eNjK/sx/xq', 'user', 1),
	(4, 'userpost', '$2b$10$vO.whv0W6bJx4FP2BN2Ldue9mVjBuHXiJha5WPB5snF3jWoYN7Zle', 'administrator', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

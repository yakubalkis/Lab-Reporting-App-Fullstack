create database `report-system`;
use `report-system`;

create table `role`(
	`id` BIGINT not null auto_increment,
    `role_name` varchar(45),
    
    
    PRIMARY KEY (`id`)
);

create table `laborant`(
	`id` BIGINT not null auto_increment,
    `first_name` varchar(45),
    `last_name` varchar(45),
    `hospital_id_no` varchar(45),
    `password` varchar(255),
    `role_id` BIGINT,
    
    
    PRIMARY KEY (`id`),
    
	KEY `FK_ROLE_idx` (`role_id`),
    CONSTRAINT `FK_ROLE`
    FOREIGN KEY (`role_id`)
    REFERENCES `role` (`id`)
);


create table `report`(
	`id` BIGINT not null auto_increment,
    `first_name` varchar(45),
    `last_name` varchar(45),
    `tc_no` varchar(45),
    `diagnosis_title` varchar(45),
    `diagnosis_detail` varchar(225),
    `date` varchar(45),
    `image_name` varchar(45),
    `laborant_id` BIGINT,
	
     
    PRIMARY KEY (`id`),
    
    KEY `FK_LABORANT_idx` (`laborant_id`),
    CONSTRAINT `FK_LABORANT`
    FOREIGN KEY (`laborant_id`)
    REFERENCES `laborant` (`id`)
    
);











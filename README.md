# nodejsScheduleBoard
nodejs 연습으로 만든 일정 공유 게시판 사이트

사용시 DB 필요 
mysql 

webpagecontent
1.board
2.boardcomment
3.members
4.schedules

create TABLE IF NOT exists board(
	id int not null auto_increment,
    writer varchar(20) default null,
    title varchar(100) default null,
    content text default null,
    date datetime default null,
    primary key(id)
    );

    create table if not exists boardcomment(
	cid int not null auto_increment,
    cwriter varchar(20),
    bid int,
    ccontent text,
    cdate datetime,
    primary key(cid)
);

create table members(
	mid int auto_increment not null,
    mname varchar(255),
    mpassword varchar(255),
    primary key(mid)
    );


CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME,
    allDay BOOLEAN NOT NULL,
    pparticipants varchar(255)
);
    

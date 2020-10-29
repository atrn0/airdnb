explain analyze
select * from rooms
where host_id = 'bu7s8inb0m7rpebtrp7g' and id > 'bu7s8hnb0m7rpebtqpkg' and price between 5000 and 10000
limit 20;

explain analyse
select * from rooms where id = 'bu7s8hnb0m7rpebtqpkg';

explain analyse
select res.id, check_in, check_out, guest_id, g.name, room_id, r.name from reservations as res
                                                                       inner join rooms r on r.id = res.room_id inner join guests g on g.id = res.guest_id
where guest_id = 'bu7s6l7b0m7rpm50qv4g' and check_in > '2020-10-21 00:00:00' and check_out < '2020-10-23 00:00:00'
limit 20;

explain analyse
select id, name, price, host_id from rooms
where host_id = 'bu7s8jnb0m7rpebtt0p0'
limit 20;



select count(*) as room_count, host_id from rooms group by host_id;

explain analyse
select res.id, check_in, check_out, guest_id, room_id, r.name from reservations as res
                                                                       inner join rooms r on r.id = res.room_id
where guest_id = 'bu7sohfb0m7rpgb5ukgg' and check_in > '2020-10-21 00:00:00' and check_out < '2020-10-23 00:00:00'
order by check_in
limit 20;

explain analyse
select res.id, check_in, check_out, guest_id, room_id, r.name, r.host_id from reservations as res
                                                                                  inner join rooms r on r.id = res.room_id
where host_id = 'bu7t3qvb0m7rpf64tc0g' and check_in > '2020-10-21 00:00:00' and check_out < '2020-10-23 00:00:00'
order by check_in
limit 20;

select count(*) as reservations, host_id from reservations
                                                  inner join rooms r on r.id = reservations.room_id group by host_id
order by reservations desc limit 20;


select * from
    (select count(*) as reservations, guest_id from reservations group by guest_id) as rgi
where reservations > 20
order by reservations desc;

explain analyse
select res.id, check_in, check_out, guest_id, g.name, room_id, r.name from reservations as res
                                                                               inner join rooms r on r.id = res.room_id inner join guests g on g.id = res.guest_id
where host_id = 'bu7t3qvb0m7rpf64tc0g' and check_in > '2020-10-21 00:00:00' and check_out < '2020-10-23 00:00:00'
order by check_in
limit 20;


explain analyse
select res.id, check_in, check_out, guest_id, room_id, r.name from reservations as res
                                                                       inner join rooms r on r.id = res.room_id
where host_id = 'bu7t3qvb0m7rpf64tc0g' and check_in > '2020-10-21 00:00:00' and check_out < '2020-10-23 00:00:00'
limit 20;

explain analyse
select res.id, check_in, check_out, guest_id, room_id, r.name from rooms r
                                                                       inner join reservations res on r.id = res.room_id
where guest_id = 'bu7s6l7b0m7rpm50qv4g' and check_in > '2020-10-21 00:00:00' and check_out < '2020-10-23 00:00:00'
limit 20;

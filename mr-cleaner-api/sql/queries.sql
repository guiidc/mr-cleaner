-- GET COMPANY BY ID --
select * from companies as c
where c.id ='b24dd057-35d7-4997-8a41-57fcd8a6f836'
limit 1;

-- GET COMPANY BY E-MAIL --
select * from companies c where c.email = 'docker@maill.com' limit 1;

-- GET COMPANY BY PHONE --
select * from companies c where c.phone = '47993283782' limit 1;

-- GET COMPANY BY COORDINATES --
select * from companies c where c.coordinate_x = '32.32' and c.coordinate_y = '54.54' limit 1;

-- SAVE COMPANY --
insert into companies (id, name, email, phone, coordinate_x, coordinate_y, updated_at)
values ('0f5e12ae-f9f0-4967-b203-9c92f3027ab3', 'Empresa Demo', 'demo@mail.com', '47991224475', 50.50, 20.20, CURRENT_TIMESTAMP)

-- LIST COMPANIES --
select * from companies;

-- UPDATE COMPANIES --
update companies set name = 'New Name', email = 'newemail@mail.com', phone = '387483924', coordinate_x = 32.30, coordinate_y = 40.40 where id = '0f5e12ae-f9f0-4967-b203-9c92f3027ab3';

-- DELETE COMPANY BY ID --
delete from companies where id = '0f5e12ae-f9f0-4967-b203-9c92f3027ab3';

-- GET ROLE BY ID --
select * from roles r where r.id = 'be91eabb-d91a-44ca-bc02-7004115ea174';

-- GET USER BY EMAIL --
select * from users u where u.email = 'admin@mail.com';

-- UPDATE LAST ACCESS TOKEN --
update users set last_access_token = 'novo_token_de_acesso_jwt' where id = '2e7ab14f-2b85-4abe-bae4-ee29879cffec';

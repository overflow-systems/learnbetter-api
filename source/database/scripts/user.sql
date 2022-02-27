create user 'learnbetter'@'localhost' identified by 'learnbetter';

alter user 'learnbetter'@'localhost' identified with mysql_native_password by 'learnbetter';

flush privileges;

use learnbetter;

grant all on learnbetter.* to 'learnbetter'@'localhost' with grant option;

flush privileges;

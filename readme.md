https://smarthomeapi.onrender.com

POST: ...../admin/create - створення облікового запису адміна (може виконувати будь хто)
POST: ...../admin/login - вхід в обліковий запис адміна (може виконувати будь хто)
GET: ....../admin/logout - вихід з облікового запису адміна (з токеном адміна, може виконувати тільки адмін)
PATCH: ..../admin - редагування даних облікового запису адміна (з токеном адміна, може виконувати тільки адмін)
GET: ....../admin - повернення повної інформації про адміна (з токеном, може виконувати адмін або юзер)

POST: ...../user/create - створення облікового запису користувача (з токеном адміна, може виконувати тільки адмін)
POST: ...../user/login - вхід в обліковий запис користувача (може виконувати будь хто)
GET: ....../user/logout - вихід з облікового запису користувача (з токеном користувача, може виконувати тільки користувач)
DELETE: .../user/userID - видалення облікового запису користувача (з токеном адміна, може виконувати тільки адмін)
PATCH: ..../user/userID - редагування даних облікового запису користувача (з токеном адміна, може виконувати тільки адмін)
GET: ....../user - повернення повної інформації про юзерів (з токеном, може виконувати адмін або юзер)

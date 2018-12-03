import data
import unittest
import psycopg2

class TestDatabase(unittest.TestCase):
    


    def test_database_connection(self):
        db=self.create_tables()
        self.assertIsInstance(db,data.Database)
        self.delete_tables(db)
    def test_database_query(self):
        db=self.create_tables()
        result=db.select('tst_client','id=1')
        self.assertEqual(result,[(1,'Bob')])
        self.delete_tables(db)
    def test_database_insert_delete(self):
        db=self.create_tables()
        db.insert('tst_client','name',('\'Jim\''))
        result=db.select('tst_client','name=\'Jim\'')
        self.assertEqual(result[0][1],'Jim')
        db.insert('tst_invoices',('date','location','client_id'),('2018-01-01','Calgary',1))
        db.delete('tst_client','name=\'Jim\'')
        result=db.select('tst_client','name=\'Jim\'')
        self.assertEqual(result,[])
        db.delete('tst_invoices','client_id=1')
        result=db.select('tst_invoices','client_id=1')
        self.assertEqual(result,[])
        self.delete_tables(db)
    def test_database_join(self):
        db=self.create_tables()
        db.insert('tst_invoices',('date','location','client_id'),('2018-01-01','Calgary',1))
        result=db.join('tst_client','tst_invoices','id','client_id','one.id=1')
        self.assertEqual(result[0][0],1)
        self.assertEqual(result[0][1],'Bob')
        self.assertEqual(result[0][5],1)
        db.delete('tst_invoices','client_id=1')
        self.delete_tables(db)
    def test_database_update(self):
        db=self.create_tables()
        db.update('tst_client','name','bob2','id=1')
        result = db.select('tst_client','id=1')
        self.assertEqual(result,[(1,'bob2')])
        self.delete_tables(db)
        

    @staticmethod
    def create_tables():
        db=data.Database('evolveu','evolveu','Password','localhost',5432)
        cur = db.conn.cursor()
        cur.execute('create table tst_client(id serial primary key unique, name text)')
        db.conn.commit()
        cur.execute('insert into tst_client(name) values(\'Bob\')')
        db.conn.commit()
        cur.execute('create table tst_invoices(id serial primary key unique, date timestamp with time zone, location text, client_id integer, total float)')
        db.conn.commit()
        cur.close()

        return db
    @staticmethod
    def delete_tables(db):
        cur= db.conn.cursor()
        cur.execute('drop table tst_client')
        cur.execute('drop table tst_invoices')
        db.conn.commit()
        cur.close()
        db.close_con()


# class TestOop(unittest.TestCase):

#     def test_class(self):
#         emp1 = Employee('Test', 'User', 50000)
#         self.assertIsInstance(emp1, Employee)
#         self.assertEqual('Test', emp1.first)
#         self.assertEqual('User', emp1.last)
#         self.assertEqual(50000, emp1.pay)

#     def test_fullname(self):r
#         emp1 = Employee('Test', 'User', 50000)
#         self.assertEqual('Test User', emp1.fullname())
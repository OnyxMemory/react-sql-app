import data
import unittest
import psycopg2
import os

DBNAME=os.getenv("DB_NAME")
USER=os.getenv("DB_USER")
PASSWORD=os.getenv("DB_PASSWORD")
HOST=os.getenv("DB_HOST")
PORT=os.getenv("DB_PORT")

class TestDatabase(unittest.TestCase):
    


    def test_database_connection(self):
        self.delete_tables()
        self.create_tables()
        db=data.Database(DBNAME,USER,PASSWORD,HOST,PORT)
        self.assertIsInstance(db,data.Database)
        db.close_con()
        self.delete_tables()
    def test_database_query(self):
        self.delete_tables()
        self.create_tables()
        db=data.Database(DBNAME,USER,PASSWORD,HOST,PORT)
        result=db.select('tst_client','id=1')
        self.assertEqual(result,[(1,'Bob')])
        db.close_con()
        self.delete_tables()
    def test_database_insert_delete(self):
        self.delete_tables()
        self.create_tables()
        db=data.Database(DBNAME,USER,PASSWORD,HOST,PORT)
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
        db.close_con()
        self.delete_tables()
    def test_database_join(self):
        self.delete_tables()
        self.create_tables()
        db=data.Database(DBNAME,USER,PASSWORD,HOST,PORT)
        db.insert('tst_invoices',('date','location','client_id'),('2018-01-01','Calgary',1))
        result=db.join('tst_client','tst_invoices','id','client_id','one.id=1')
        self.assertEqual(result[0][0],1)
        self.assertEqual(result[0][1],'Bob')
        self.assertEqual(result[0][5],1)
        db.delete('tst_invoices','client_id=1')
        db.close_con()
        self.delete_tables()
    def test_database_update(self):
        db=data.Database(DBNAME,USER,PASSWORD,HOST,PORT)
        self.delete_tables()
        self.create_tables()
        db.update('tst_client','name','bob2','id=1')
        result = db.select('tst_client','id=1')
        self.assertEqual(result,[(1,'bob2')])
        db.close_con()
        self.delete_tables()
        

    @staticmethod
    def create_tables():
        db=data.Database(DBNAME,USER,PASSWORD,HOST,PORT)
        cur = db.conn.cursor()
        cur.execute('create table tst_client(id serial primary key unique, name text)')
        db.conn.commit()
        cur.execute('insert into tst_client(name) values(\'Bob\')')
        db.conn.commit()
        cur.execute('create table tst_invoices(id serial primary key unique, date timestamp with time zone, location text, client_id integer, total float)')
        db.conn.commit()
        cur.close()
        db.close_con()
        # return db
    @staticmethod
    def delete_tables():
        db=data.Database(DBNAME,USER,PASSWORD,HOST,PORT)
        cur= db.conn.cursor()
        cur.execute('drop table if exists tst_client')
        db.conn.commit()
        cur.execute('drop table if exists tst_invoices')
        print('test3')
        db.conn.commit()
        cur.close()
        db.close_con()
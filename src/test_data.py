import data
import unittest

class TestDatabase(unittest.TestCase):
    def test_database_connection(self):
        db=data.Database('evolveu','evolveu','Password','localhost',5432)
        self.assertIsInstance(db,data.Database)
    def test_database_query(self):
        db=data.Database('evolveu','evolveu','Password','localhost',5432)
        result=db.select('client','id=1')
        self.assertEqual(result,[(1,'Bob')])
    def test_database_insert_delete(self):
        db=data.Database('evolveu','evolveu','Password','localhost',5432)
        db.insert('client','name',('\'Jim\''))
        result=db.select('client','name=\'Jim\'')
        self.assertEqual(result[0][1],'Jim')
        db.insert('invoices',('date','location','client_id'),('2018-01-01','Calgary',1))
        db.delete('client','name=\'Jim\'')
        result=db.select('client','name=\'Jim\'')
        self.assertEqual(result,[])
        db.delete('invoices','client_id=1')
        result=db.select('invoices','client_id=1')
        self.assertEqual(result,[])
    def test_database_join(self):
        db=data.Database('evolveu','evolveu','Password','localhost',5432)
        db.insert('invoices',('date','location','client_id'),('2018-01-01','Calgary',1))
        result=db.join('client','invoices','id','client_id','one.id=1')
        self.assertEqual(result[0][0],1)
        self.assertEqual(result[0][1],'Bob')
        self.assertEqual(result[0][5],1)
        db.delete('invoices','client_id=1')



# class TestOop(unittest.TestCase):

#     def test_class(self):
#         emp1 = Employee('Test', 'User', 50000)
#         self.assertIsInstance(emp1, Employee)
#         self.assertEqual('Test', emp1.first)
#         self.assertEqual('User', emp1.last)
#         self.assertEqual(50000, emp1.pay)

#     def test_fullname(self):
#         emp1 = Employee('Test', 'User', 50000)
#         self.assertEqual('Test User', emp1.fullname())
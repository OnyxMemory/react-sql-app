import psycopg2
from flask import jsonify

class Database: 
    def __init__(self,DBNAME,USER,PASSWORD,HOST,PORT):
        self.conn = psycopg2.connect(dbname=DBNAME,
                                     user=USER,
                                     password=PASSWORD,
                                     host=HOST,
                                     port=PORT)
    def select(self,table,params):
        cur = self.conn.cursor()
        if params=='all':
            cur.execute(f'select * from {table}')
        else:
            cur.execute(f'select * from {table} where {params}')
        result=cur.fetchall()
        cur.close()
        return result
    def insert(self,tablename,column,params):

        if not isinstance(params,tuple):
            tple=f'({params})'  
        else:
            tple=params
        if not isinstance(column,tuple):
            clm=f'({column})'
        else:
            clm='('
            for entry in column:
                clm+=entry + ','
            clm=clm[:-1]
            clm+=')'
        #self.execute(f'insert into {tablename} values {tple}')
        cur = self.conn.cursor()
        cur.execute(f'insert into {tablename}{clm} values {tple}')
        self.conn.commit()
        cur.close()
    def delete(self,table,param):
        cur = self.conn.cursor()
        cur.execute(f'delete from {table} where {param}')
        self.conn.commit()
        cur.close()
    def join(self,table1,table2,table1col,table2col,condition):
        cur = self.conn.cursor()
        cur.execute(f'select * from {table1} one, {table2} two where one.{table1col} = two.{table2col} AND {condition}')
        result=cur.fetchall()
        cur.close()
        return result

    



# def sqlq(arg):
#     conn = psycopg2.connect("dbname=evolveu")
#     cur = conn.cursor()
    
#     cur.execute (arg)
#     result = cur.fetchall()
#     cur.close()
#     conn.close()

#     return result

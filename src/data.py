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

        # if not isinstance(params,tuple):
        #     tple=f'({params})'  
        # else:
        #     tple=params
        # if not isinstance(column,tuple):
        #     clm=f'({column})'
        # else:
        #     clm='('
        #     for entry in column:
        #         clm+=entry + ','
        #     clm=clm[:-1]
        #     clm+=')'
        tple = self.tuplize(params,True)
        clm = self.tuplize(column,False)

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
    def update(self,tablename,columns,newparams,condition):
        cur = self.conn.cursor()
        if isinstance(columns,tuple):
            statement =f'{columns[0]} = {newparams[0]}'
            for i in range(1,len(columns)):
                inpt = self.addquotes(newparams[i])
                statement+=f', {columns[i]}={inpt}'
        else:
            inpt = self.addquotes(newparams)
            statement = f'{columns}={inpt}'
        cur.execute(f'update {tablename} set {statement} where {condition}')
        self.conn.commit()
        #cur.execute('update client set name = 1 where id=1')
        cur.close()
    @staticmethod
    def tuplize(arg,quotes):
        if not isinstance(arg,tuple):
            tple=f'({arg})'  
        elif quotes:
            tple=arg
        elif not quotes:
            tple='('
            for entry in arg:
                tple+=entry + ','
            tple=tple[:-1]
            tple+=')'

        return tple
    @staticmethod
    def addquotes(arg):
        if isinstance(arg,str):
            return f'\'{arg}\''
        else:
            return arg
        
    def close_con(self):
        self.conn.close()

    



# def sqlq(arg):
#     conn = psycopg2.connect("dbname=evolveu")
#     cur = conn.cursor()
    
#     cur.execute (arg)
#     result = cur.fetchall()
#     cur.close()
#     conn.close()

#     return result

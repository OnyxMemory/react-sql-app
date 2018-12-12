from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from data import Database
from flask_cors import CORS
import os

DBNAME=os.getenv("DB_NAME")
USER=os.getenv("DB_USER")
PASSWORD=os.getenv("DB_PASSWORD")
HOST=os.getenv("DB_HOST")
PORT=os.getenv("DB_PORT")

app=Flask(__name__)
CORS(app)
api = Api(app)


db=Database(DBNAME,USER,PASSWORD,HOST,PORT)


class ClientRsrc(Resource):
    def get(self,client_id):
        if client_id=='all':
            return jsonify(db.select('client','all'))
        else:
            return jsonify(db.select('client',f'id={client_id}'))
    def post(self,client_id):
        content=request.get_json()
        name=content.get('name')
        db.insert('client','name',f'\'{name}\'')
        return 'Client Successfuly Created!'
    def put(self,client_id):
        content=request.get_json()
        name=content.get('name')
        db.update('client','name',name,f'id={client_id}')
        return 'Client Successfuly Updated!'
    def delete(self,client_id):
        db.delete('client',f'id={client_id}')
        return 'Client Deleted!'

class Invoices(Resource):
    def get(self,client):
        if client=='all':
            return jsonify(db.select('invoices','all'))
        else:
            return jsonify(db.join('client','invoices','id','client_id',f'one.id={client}'))
    def post(self,client):
        content=request.get_json()
        invoiceDate=content.get('date')
        invoiceLocation=content.get('location')
        invoiceClientId=content.get('client_id')
        invoiceTotal=content.get('total')
        db.insert('invoices',('date','location','client_id','total'),(invoiceDate,invoiceLocation,invoiceClientId, invoiceTotal))
        return 'Invoice Created Successfuly'
class ClientByName(Resource):
    def get(self,client_name):
        if client_name=='all':
            return jsonify(db.select('client','all'))
        else:
            return jsonify(db.select('client',f'name~*\'{client_name}\''))
    


api.add_resource(ClientRsrc, '/client/<string:client_id>')
api.add_resource(Invoices, '/inv/<string:client>')
api.add_resource(ClientByName, '/clientn/<string:client_name>')

if __name__ == '__main__':
    app.run(debug=True)
        


# todos = {}

# class TodoSimple(Resource):
#     def get(self, todo_id):
#         return {todo_id: todos[todo_id]}

#     def put(self, todo_id):
#         todos[todo_id] = request.form['data']
#         return {todo_id: todos[todo_id]}

# api.add_resource(TodoSimple, '/<string:todo_id>')

# if __name__ == '__main__':
#     app.run(debug=True)
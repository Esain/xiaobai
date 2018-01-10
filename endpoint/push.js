var path = require('path')
var request = require('request');
const spawn = require('child_process').spawn

module.exports = function (req, resp, param, next) {
    var push_name = param.sender.login;
    var exec_path = path.join( process.cwd(), 'deploy.sh');
    if(push_name === 'Esain' || push_name === 'perany'){
    	const args = [exec_path]
    	runCmd('sh', args, (text) => {
		    console.log(text)
		})
		res.status(200)
  		res.end()
    }else{
    	resp.status(404);
    	resp.end();
    }

}

function runCmd(cmd, args, callback) {
  const child = spawn(cmd, args)
  let resp = ''

  child.stdout.on('data', (buffer) => {
    resp += buffer.toString()
  })
  child.stdout.on('end', () => {
    callback(resp)
  })
}
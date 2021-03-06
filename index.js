
const fs = require('fs');
const stdin = process.stdin;
const stdout = process.stdout;

fs.readdir(__dirname, (err, files) => {

    console.log(" ");

    if(!files.length) {
        return console.log('      \033[31m No files to show!\033[39m\n');
    }

    console.log("    Select which file or directory you watn to see\n");

    let stats = [];
    function file(i) {
        let filename = files[i];

        fs.stat(__dirname + '/' + filename, function(err, stat) {
            stats[i] = stat
            if(stat.isDirectory()){
                console.log('        '+ i + '         \033[36m'+ filename + '/\033[39m');
            } else {
                console.log('        '+ i + '         \033[90m' + filename + '\033[39m');
            }

            i++;

            if(i == files.length){
                read();
            }else {
                file(i);
            }
        })
    }

    // Read user input when files are shown
    function read() {
        console.log('Enter "exit" to exit the program');
        stdout.write('        \033[33, enter your Choice: \033[39m');
        stdin.resume();
        stdin.setEncoding('utf8');

        stdin.on('data', option);
    }

    function option(data){
        const filename = files[Number(data)];
        if(!filename){
            stdout.write('        \033[31m Enter a Valid choice:  \033[39m');
        }else if(stats[Number(data)].isDirectory()){
            fs.readdir(__dirname + '/' + filename, function(err,files){
                console.log(' ');
                console.log('     ( '+ files.length + ' files )');
                files.forEach(file => {
                    console.log('     -    ' + file);
                });
                console.log(' ');
            });

            stdin.pause();
        } else {
            fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data){
                console.log(' ');
                console.log('\003[90m' + data.replace(/(.*)/g, '          $1') + '\033[39m');
            });

            stdin.pause();


        }
        
    }



    file(0);
})
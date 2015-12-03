/**
 * Created by zarges on 13.12.14.
 */

var shell = require('shelljs');

module.exports = function (grunt) {
    'use strict';

    var copyToPath = '',
        copiedFilesTxtFile = '.copied_files.txt';

    grunt.registerMultiTask('githubpublish', 'Publishes files on github pages branch', function () {

        var git = new Git(),
            copiedFiles = [];

        var currentBranch = git.getCurrentBranch();

        git.checkoutBranch('gh-pages');

        git.pull('gh-pages','origin');

        try {
            var lastCopiedFiles = grunt.file.readJSON(copiedFilesTxtFile);
            deleteOldFiles(lastCopiedFiles);
            git.remove(copiedFilesTxtFile);
            git.commit('Removed old version');
        } catch (err) {
            grunt.log.write('No old files were found');
        }
        
        this.files.forEach(function (filePair) {


            filePair.src.forEach(function (src) {

                grunt.file.recurse(src, function (abspath) {
                    var newPath = abspath.replace(src, copyToPath);
                    if(newPath[0]==='/'){
                        newPath = newPath.replace('/','');
                    }

                    grunt.file.copy(abspath, newPath);
                    copiedFiles.push(newPath);
                });

            });

        });

        git.stageFiles(copiedFiles);

        var copiedFileStr = JSON.stringify(copiedFiles);

        grunt.file.write(copiedFilesTxtFile, copiedFileStr);

        git.stageFile(copiedFilesTxtFile);

        git.commit('Released new version');

        git.push('gh-pages','origin');

        git.checkoutBranch(currentBranch);
        
    });

    var Git = function(){

        var _executeCommend = function(command){
          var returnValue = shell.exec(command);
            if(returnValue.code !== 0){
                throw new Error(returnValue.output);
            } else {
                return returnValue;
            }
        };

        this.checkoutBranch = function(branchName){
            branchName = branchName.toString().trim();
            return _executeCommend('git checkout '+branchName);
        };

        this.stash = function(){
            return _executeCommend('git stash ');
        };

        this.stashApply = function(){
            return _executeCommend('git stash apply');
        };

        this.push = function(branchName, origin){
            return _executeCommend('git push '+origin+' '+branchName);
        };

        this.pull = function(branchName, origin){
            return _executeCommend('git pull '+origin+' '+branchName);
        };

        this.stageFile = function(file){
            return _executeCommend('git add '+file);
        };

        this.stageFiles = function(files){
            var self = this;
            files.forEach(function(file){
                self.stageFile(file);
            });
        };

        this.commit = function(message){
            message = message || '';
            return _executeCommend('git commit -m "'+message+'"');
        };

        this.getCurrentBranch = function(){
            return _executeCommend('git rev-parse --abbrev-ref HEAD').output.trim();
        };

        this.remove = function(path){
            return _executeCommend('git rm -rf '+path);
        };
    };

    var deleteOldFiles = function (oldFiles) {
        if (oldFiles && oldFiles.length > 0) {
            var alreadyDeletedPaths = [];
            oldFiles.forEach(function (file) {
                file = unixifyPath(file);
                var firstPath = file.split('/')[0];
                if (alreadyDeletedPaths.indexOf(firstPath) === -1) {
                    try{
                        shell.exec('git rm -rf '+firstPath);
                        alreadyDeletedPaths.push(firstPath);
                    } catch (err){
                        grunt.verbose.writeln('Could not delete '+file+' because it does not exist');
                    }
                }
            });
        }
    };

    var unixifyPath = function (filepath) {
        if (process.platform === 'win32') {
            return filepath.replace(/\\/g, '/');
        } else {
            return filepath;
        }
    };
};
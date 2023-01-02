({
    menuObject: function (path, content) {
        return {
            path: path,
            content: content,
            leafs: [],
            child: [],
            addLeaf: function (content) {
                this.leafs.push(content);
            },
            addMenu: function (menuContent) {
                this.child.push(menuContent);
            },
            sortFunc: function (a, b) {
                if (b.path.startsWith(a.path)) {
                    return -1;
                } else {
                    return 1;
                }
            },
            sort: function () {
                return this.child.sort((a, b) => a.sortFunc(a, b));
            },
            sortMenu: function () {
                if (!this.child.length > 0 || this.child.length === 1)
                    return;
                this.child = this.sort();
                var rI = [];
                var prevMenu = this.child[0];
                for (var i = 1; i < this.child.length; i++) {
                    var curMenu = this.child[i];
                    if (curMenu.path.startsWith(prevMenu.path)) {
                        prevMenu.addMenu(curMenu);
                        rI.push(i);
                    } else {
                        // console.log(prevMenu);
                        prevMenu.sortMenu();
                        prevMenu = curMenu;
                    }
                }

                // Remove Menu Items which are moved
                for (var i = 0; i < rI.length; i++) {
                    this.child[rI[i]] = null;
                }

                this.child = this.child.filter(x => x != null);
                // for (menu of this.child) {
                //     console.log(menu);
                //     // menu.sortMenu();
                // }
            },
            compile: function () {
                var compiledLeafs = this.compileLeafs(this.content);
                if (this.child.length == 0) {
                    // jquery wrap return inner element so need parent() call
                    var me = $(this.content).wrap("<li></li>").parent();
                    me.append(compiledLeafs);
                    return me;
                }

                // console.log(`Start Compiling menu: ${this.path}`);
                var container = $("<ul>");
                var cm = this.compileMenu();
                for (menu of cm) {
                    container.append(menu);
                }
                if (compiledLeafs != null) {
                    container.prepend(compiledLeafs);
                }

                var me = $(this.content).wrap("<li></li>").parent();
                me.append(container);
                // console.log(`End Compiling menu: ${this.path}`);
                return me;
            },
            compileMenu: function () {
                if (this.child.length == 0) {
                    return null;
                }

                var container = $("<ul>");
                for (menu of this.child) {
                    container.append(menu.compile());
                }

                container.unwrap();
                return container;
            },
            compileLeafs: function () {
                if (this.leafs.length == 0)
                    return null;

                var leafContainer = $("<ul>");
                for (leaf of this.leafs) {
                    $(leafContainer).append(leaf);
                }

                return leafContainer;
            }
        }
    },
    menuStack: [],
    buildMenu: function () {
        // console.log(window.p);
        // var p = "/,/docs/a,/docs/b/1,/docs/b/2.html,/docs/a/1.html,/docs/a/2,/docs/a/2/2.html";
        // var p = "/,/docs/a/abc.html,/docs/a/ab.html,/docs/a/a.html,/docs/b/abc.html,/docs/c/r/abc.html";
        // var p = "/,/docs/b/abc.html";
        var paths = p.split(',').sort();
        // console.log(paths);
        for (var i = 1; i < paths.length; i++) {
            var curPath = paths[i].trim();
            if (curPath.endsWith(".html")) {
                // It is leaf
                // Create or find parent structure
                var parentPath = this.getParentPath(curPath);
                var em = this.getOrCreateMenu(parentPath);
                this.addLeaf(curPath, em);
            } else {
                // If no leaf then ensure menu structure
                var em = this.getOrCreateMenu(curPath);
            }
        }

        this.sortMenu();
        // console.log(this.menuStack);
        this.compileMenu();
    },
    getOrCreateMenu: function (path) {
        // Return Existing menu if found
        var em = this.findPath(path);
        if (em != null) {
            return em;
        }

        var name = this.getFileName(path);
        var newMenu = this.menuObject(path, this.createParent(name));
        this.menuStack.push(newMenu);

        var parentPath = this.getParentPath(path);
        if (parentPath === "/docs") {
            return newMenu;
        } else {
            this.getOrCreateMenu(parentPath);
        }

        return newMenu;
    },
    addLeaf: function (path, menu) {
        var fileName = this.getFileName(path).replace(".html", "");
        menu.addLeaf(this.createChild(fileName, path));
    },
    findPath: function (path) {
        var existingMenu = this.menuStack.find(x => x.path === path);
        if (existingMenu)
            return existingMenu;
        return null;
    },
    createChild: function (name, path) {
        return `<li><a href="${path}"><i class="bi bi-circle"></i>${decodeURI(name)}</a></li>`;
    },
    createParent: function (name) {
        name = name.trim();
        return $(`<a href="javascript:;" class="has-arrow">
                    <div class="parent-icon"><i class="bi bi-grid-fill"></i></div>
                    <div class="menu-title">${decodeURI(name)}</div>
                </a>`);
    },
    getParentPath: function (path) {
        var lastIndex = path.lastIndexOf('/');
        return path.substring(0, lastIndex);
    },
    getFileName: function (path) {
        var lastIndex = path.lastIndexOf('/');
        return path.substring(lastIndex + 1);
    },
    sortMenu: function () {
        this.menuStack = this.menuStack.sort((a, b) => a.sortFunc(a, b));
        var rI = [];
        var prevMenu = this.menuStack[0];
        for (var i = 1; i < this.menuStack.length; i++) {
            var curMenu = this.menuStack[i];
            if (curMenu.path.startsWith(prevMenu.path)) {
                prevMenu.addMenu(curMenu);
                rI.push(i);
            } else {
                // console.log(prevMenu);
                prevMenu.sortMenu();
                prevMenu = curMenu;
            }
        }

        // Remove Menu Items which are moved
        for (var i = 0; i < rI.length; i++) {
            this.menuStack[rI[i]] = null;
        }

        this.menuStack = this.menuStack.filter(x => x != null);
        // console.log(this.menuStack);
    },
    compileMenu: function () {
        var objMenu = $("#menu");
        for (menu of this.menuStack) {
            objMenu.append(menu.compile());
        }
    }
}.buildMenu());
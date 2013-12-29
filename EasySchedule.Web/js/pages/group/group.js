angular.module('pages.group', [
        'resources.group',
        'resources.spond',
        'resources.profile',
        'services.map',
        'services.parser',
        'common.filters',
        'controls'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/groups', {
            templateUrl: 'js/pages/group/group-list.html',
            controller: 'GroupListController'
        });
        $routeProvider.when('/groups/:groupId/edit', {
            templateUrl: 'js/pages/group/group-edit.html',
            controller: 'GroupEditController'
        });
        $routeProvider.when('/confirmGroupEmail/:groupId', {
            templateUrl: 'js/pages/group/group-edit.html',
            controller: 'GroupEditController'
        });
        $routeProvider.when('/groups/create', {
            templateUrl: 'js/pages/group/group-edit.html',
            controller: 'GroupEditController'
        });
        $routeProvider.when('/invitation', {
            templateUrl: 'js/pages/group/group-accept.html',
            controller: 'GroupInvitationController',
            access: 'free'
        });
        $routeProvider.when('/groups/:groupId/members', {
            templateUrl: 'js/pages/group/group-members-edit.html',
            controller: 'GroupMembershipController'
        });
    } ])
    .controller('GroupListController', ['$scope', '$rootScope', '$location', '$window', 'Group', 'Profile', '$timeout',
        function ($scope, $rootScope, $location, $window, Group, Profile, $timeout) {
            $scope.$on('$viewContentLoaded', function (event) {
                $window._gaq.push(['_trackPageview', $location.path()]);
                console.log('track page: ' + $location.path());
            });
            $scope.isDataLoading = true;
            $scope.groups = [];
            $scope.contacts = [];

            function getAllGroups(cursor) {
                $rootScope.setCursor(cursor);
                Group.getGroupsList({
                    memberProfileId: $rootScope.profile.id,
                    memberStatus: enums.membershipStatus.accepted
                }, function (data, status, headers) {
                    cursor = headers('x-spond-cursor');
                    $scope.groups = $scope.groups.concat(data);
                    if (!cursor) {
                        $scope.adminGroups = _.where($scope.groups, { admin: true });
                        $scope.memberGroups = _.where($scope.groups, { admin: false });
                    } else {
                        getAllGroups(cursor);
                    }
                });
            };
            getAllGroups('');

            function updateGroupsList() {
                $scope.isDataLoading = true;
                Group.getGroupsList({
                    memberProfileId: $rootScope.profile.id,
                    memberStatus: enums.membershipStatus.accepted
                }, function (data, status, headers) {
                    $scope.isDataLoading = true;
                    $scope.noMore = !headers('x-spond-cursor');
                    $scope.cursor = headers('x-spond-cursor');
                    $rootScope.setCursor('');
                    $scope.groups = $scope.groups.concat(data);

                    $scope.isDataLoading = $scope.noMore;
                });
                //                Group.getGroupMembers('*', { profileId: $rootScope.profile.id, status: enums.membershipStatus.invited }, function (data) {
                //                    for (var i = 0; i < data.length; i++) {
                //                        data[i].group = { id: data[i].groupId, name: data[i].groupName };
                //                        data[i].invitedBy = Profile.get({ id: data[i].inviterProfileId });
                //                    }
                //                    $scope.invitedMembership = data;
                //                });
            }

            $scope.showMore = function () {
                //$rootScope.setCursor($scope.cursor);
                //updateGroupsList();
            };

            $scope.toggleGroup = function (group) {
                group.isExpanded = !group.isExpanded;
                Group.getGroupMembers(group.id, { status: enums.membershipStatus.accepted }, function (data) {
                    group.members = data;
                    group.membersCount = data.length;
                });
            };

            $scope.createGroup = function () {
                console.log('creating a group');
                $scope.group = { name: $rootScope.dictionary['New_group'], visibility: 1 };
                Group.createGroup($scope.group, function (data) {
                    $location.path('/groups/' + data.id + '/edit');
                });
            };

            $scope.leaveGroup = function (group) {
                if (!$rootScope.isLoading()) {
                    var memberId = _.findWhere(group.members, { profileId: $rootScope.profile.id }).id;
                    Group.deleteMember(memberId, group.id, function () {
                        $scope.memberGroups.splice($scope.memberGroups.indexOf(group), 1);
                    });
                }
            };

            $scope.accept = function (invitation) {
                Group.updateMember({
                    profileId: $rootScope.profile.id,
                    status: enums.membershipStatus.accepted
                }, invitation.id, invitation.group.id, updateGroupsList);
                $rootScope.showMessage($rootScope.dictionaty['accepted_invitation']);
            };

            $scope.decline = function (invitation) {
                Group.updateMember({
                    profileId: $rootScope.profile.id,
                    status: enums.membershipStatus.declined
                }, invitation.id, invitation.group.id, updateGroupsList);
            };

            $scope.filterText = '';
        } ])
    .controller('GroupEditController', ['$scope', '$routeParams', '$rootScope', '$location', '$window', 'Group', 'Profile', 'MapService', 'Parser', '$timeout', '$document', '$filter',
        function ($scope, $routeParams, $rootScope, $location, $window, Group, Profile, MapService, Parser, $timeout, $document, $filter) {
            $scope.$on('$viewContentLoaded', function (event) {
                $window._gaq.push(['_trackPageview', $location.path()]);
                console.log('track page: ' + $location.path());
            });
            $scope.isAdvancedMode = false;
            $scope.emails = "";
            $scope.rows = [{}, {}, {}, {}, {}];
            $scope.mapService = MapService;
            $scope.groupId = parseInt($routeParams.groupId);
            $scope.newMembers = [];
            $scope.oldMembers = [];
            $scope.addedMEmbers = [];
            $scope.isNewUsersActive = true;
            $scope.newUserState = 'active';
            $scope.addressBookState = '';
            $scope.memberSearch = '';
            $scope.filterCriteria = {
                status: enums.membershipStatus.accepted
            };
            var searchCounter = -1;
            var timer = false;

            $scope.$watch('memberSearch', function () {
                if (timer) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(function () {
                    if ($scope.memberSearch.length > 2 || $scope.memberSearch.length == 0) {
                        console.log($scope.memberSearch);
                        updateContacts();
                    }
                }, 100);
            });

            $scope.$watch('addressBookState', function () {
                updateContacts();
            });

            $scope.$watch('emails', function () {
                if ($scope.emails.length > 40) {
                    angular.element("#button-container, #emails, #add-emails").addClass('bottom');
                }
                else {
                    angular.element("#button-container, #emails, #add-emails").removeClass('bottom');
                    if ($scope.emails.length == 0) {
                        angular.element('#emails').val('');
                        angular.element('#emails').trigger('change');
                    }
                }
            });

            $scope.searchKeypressed = function (e) {
                if ($scope.contacts[searchCounter]) {
                    $scope.contacts[searchCounter].activeState = '';
                }
                if (e.which == 38 && $scope.contacts[searchCounter - 1]) {
                    searchCounter--;
                }
                if (e.which == 40 && $scope.contacts[searchCounter + 1]) {
                    searchCounter++;
                }
                if (e.which == 13 && $scope.contacts[searchCounter]) {
                    $scope.addContact($scope.contacts[searchCounter]);
                }
                $scope.contacts[searchCounter].activeState = 'active';
            };

            function updateContacts() {
                console.log('got profiles');
                Profile.getProfiles({ nameOrEmail: $scope.memberSearch, sort: 'commonGroups-DESC' }, function (data) {
                    _.each(data, function (item) {
                        item.addState = 'add';
                        if (_.contains(_.map($scope.newMembers, function (member) { return member.primaryEmail; }), item.primaryEmail)) {
                            item.addState = 'added';
                        }
                        return item;
                    });
                    searchCounter = -1;
                    $scope.contacts = _.filter(data, function (item) { return item.id != $rootScope.profile.id }).slice(0, 5);
                })
            }

            function getAllMembers(cursor) {
                Group.getGroupMembers($scope.groupId, { status: [
                    enums.membershipStatus.accepted,
                    enums.membershipStatus.invited,
                    enums.membershipStatus.unconfirmed
                ]
                }, function (data, status, headers) {
                    cursor = headers()['x-spond-cursor'];
                    $scope.newMembers = $scope.newMembers.concat(data);
                    if (!cursor) {
                        _.each($scope.newMembers, function (item) { item.primaryEmail = item.email; })
                        $scope.oldMembers = $scope.newMembers.slice(0, data.length);
                        detectLastAdmin();
                    } else {
                        getAllMembers(cursor);
                    }
                });
            }

            function detectLastAdmin() {
                if (_.where($scope.newMembers, { type: enums.membershipType.admin }).length == 1) {
                    _.findWhere($scope.newMembers, { type: enums.membershipType.admin }).isLastAdmin = true;
                }
            }

            function getProfilesByEmail(count, collection) {
                if (count < collection.length) {
                    var profile = collection[count];
                    Profile.getProfiles({ email: profile.primaryEmail }, function (data) {
                        if (data.length == 1) {
                            collection[count] = data[0];
                            if (collection[count].id == $rootScope.profile.id) {
                                collection[count].type = enums.membershipType.admin;
                            }

                        }
                        if (count < collection.length - 1) {
                            getProfilesByEmail(count + 1, collection);
                        }
                        detectLastAdmin();
                    });
                }
            }

            if ($routeParams.groupId) {
                $scope.isEdit = true;
                Group.getGroup($scope.groupId, function (data) {
                    $scope.group = data;
                    if (!data.admin) {
                        $location.path('/');
                    }
                    $scope.isConfirm = !data.confirmed;
                    $scope.isAdmin = data.admin;
                    getAllMembers('');
                });
            } else {
                $scope.isEdit = false;
                $scope.group = { visibility: enums.groupVisibility.private };
            }

            if ($rootScope.isFromSpond) {
                $scope.isFromSpond = true;
                $rootScope.isFromSpond = false;
            }

            $scope.parseEmails = function () {
                $scope.errorMessage = '';
                var members = [];
                var emails = $filter('unique')(Parser.parseEmails($scope.emails));
                if (!emails && $scope.emails.length > 0) {
                    $scope.errorMessage = $rootScope.dictionary['incorrect_email'];
                }
                if (emails) {
                    for (var i = 0; i < emails.length; i++) {
                        if (!$scope.isEdit && emails[i] == $rootScope.profile.primaryEmail) {
                            continue;
                        }
                        members[i] = { primaryEmail: emails[i] };
                    }
                }
                var profileCounter = $scope.newMembers.length;
                $scope.newMembers = $scope.newMembers.concat(_.filter(members, function (item) {
                    return !_.contains(_.map($scope.newMembers, function (member) { return member.primaryEmail; }), item.primaryEmail);
                }));
                getProfilesByEmail(profileCounter, $scope.newMembers);
                $scope.emails = '';
            };

            $scope.addContact = function (member) {
                if (member.addState == 'add') {
                    member.addState = 'added';
                    $scope.newMembers.unshift(member);
                    detectLastAdmin();
                } else {
                    $scope.deleteNewMember(member);
                }
            };

            $scope.deleteNewMember = function (member) {
                member.addState = 'add';
                var contact = _.where($scope.contacts, { addState: 'added', primaryEmail: member.primaryEmail })[0];
                if (contact) {
                    contact.addState = 'add';
                }
                $scope.newMembers.splice($scope.newMembers.indexOf(member), 1);
                detectLastAdmin();
            };

            $scope.save = function () {
                $scope.isLoading = true;
                $scope.errorMessage = '';
                if ($scope.isEdit) {
                    if (validateGroup($scope.group.name)) {
                        Group.updateGroup($scope.group, function () {
                            for (var i = 0; i < $scope.oldMembers.length; i++) {
                                if (!_.contains($scope.newMembers, $scope.oldMembers[i])) {
                                    Group.deleteMember($scope.oldMembers[i].id, $scope.groupId);
                                }
                            }

                            Group.addMembers({ array: _.map(_.filter($scope.newMembers, function (item) { return !item.groupId; }),
                                function (item) { return { email: item.primaryEmail }; })
                            }, $scope.groupId, function () {
                                if ($scope.newMembers.length > $scope.oldMembers.length || _.filter($scope.newMembers, function (item) { return item.id === undefined; }).length > 0) {

                                    $rootScope.showMessage($rootScope.dictionary['members_received']);
                                }
                                $scope.isLoading = false;
                                $location.path('/groups/');
                            });
                        });
                    }
                } else {
                    if (validateGroup($scope.group.name)) {
                        Group.createGroup($scope.group, function (data) {
                            $scope.group = data;
                            console.log($scope.emails);
                            $rootScope.showMessage($rootScope.dictionary['Group_created']);
                            if ($scope.newMembers.length > 0) {
                                Group.addMembers({ array: _.map($scope.newMembers, function (item) { return { email: item.primaryEmail} }) }, $scope.group.id, function () {
                                    $scope.emails = "";
                                    $rootScope.showMessage($scope.newMembers.length + " " + $rootScope.dictionary['members_added_to_new']);
                                });
                            }
                            $scope.isLoading = false;
                            if ($scope.isFromSpond) {
                                console.log('return to spond');
                                $rootScope.tempData.groupId = data.id;
                                $location.path('sponds/create');
                            }
                            else {
                                $location.path('/groups/');
                            }
                        });
                    }
                }
            };

            $scope.confirm = function () {
                var oldAddedMemberIds = _.pluck(_.filter($scope.newMembers, function (item) { return _.contains($scope.oldMembers, item) }), 'id');
                var newAddedMemberEmails = _.map(_.filter($scope.newMembers, function (item) { return !item.groupId; }), function (item) { return { email: item.primaryEmail} });
                Group.confirmGroup($scope.group.id, $scope.group.name, oldAddedMemberIds, function () {
                    Group.addMembers({ array: newAddedMemberEmails }, $scope.groupId, function () {
                        $location.path('/groups/' + $scope.groupId);
                    });
                });
            };

            $scope.deleteGroup = function () {
                Group.deleteGroup($scope.groupId, function () {
                    $location.path('/groups');
                    $rootScope.showMessage($rootScope.dictionary['Group'] + ' ' + $scope.group.name + ' ' + $rootScope.dictionaty['was deleted']);
                });
            };

            function validateGroup(name) {
                $scope.errorMessage = '';
                if (name) {
                    if (name.length >= 140) {
                        $scope.errorMessage = $rootScope.dictionary['groupname_length'];
                    }
                    return true;
                }
                else {
                    $scope.errorMessage = $rootScope.dictionary['groupname_required'];
                }
                $scope.isLoading = false;
                return false;
            };
        } ])

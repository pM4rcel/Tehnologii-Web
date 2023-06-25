package com.example.demo.GroupMembers;

import com.example.demo.Group.GroupEntity;
import com.example.demo.Group.GroupRepository;
import com.example.demo.User.UserEntity;
import com.example.demo.User.UserRepository;

import java.util.ArrayList;
import java.util.List;

public class GroupMembersService {
    private final GroupMembersRepository groupMembersRepository = new GroupMembersRepository();
    private final GroupRepository groupRepository = new GroupRepository();
    private final UserRepository userRepository = new UserRepository();

    public GroupMembersEntity addMember(Long groupId, Long userId) {
        GroupEntity group = groupRepository.findByID(groupId);
        groupRepository.updateMembersCount(group.getName());
        return groupMembersRepository.save(new GroupMembersEntity(userId, groupId));
    }

    public List<GroupMembers> findGroupMembers(String name) {
        List<GroupMembers> groupMembers = new ArrayList<>();
        GroupEntity group = groupRepository.findByName(name);
        List<GroupMembersEntity> groupMembersEntities = groupMembersRepository.findByGroupId(group.getId());
        for (GroupMembersEntity g : groupMembersEntities) {
            UserEntity user = userRepository.findByID(g.getUserId());
            groupMembers.add(new GroupMembers(g.getUserId(), user.getName(), user.getPictureurl()));
        }
        return groupMembers;
    }
    public GroupMembersEntity findMemberInAGroup(Long userId, Long groupId){
        System.out.println(userId );
        System.out.println(groupId);
        return groupMembersRepository.findByUserIdAndGroupId(userId, groupId);
    }
    public void deleteMember(Long id){
        GroupMembersEntity groupMembersEntity = groupMembersRepository.findByID(id);
        groupRepository.updateMembersCountMinus(groupRepository.findByID(groupMembersEntity.getGroupId()).getName());
        groupMembersRepository.deleteByID(groupMembersEntity.getId());
    }
}

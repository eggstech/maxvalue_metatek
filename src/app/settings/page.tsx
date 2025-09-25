
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { PlusCircle } from 'lucide-react';

const users = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', role: 'Admin', avatarId: 'user-avatar-2' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', role: 'Manager', avatarId: 'user-avatar-3' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', role: 'Manager', avatarId: 'user-avatar-4' },
  { name: 'William Kim', email: 'will@email.com', role: 'Auditor', avatarId: '' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', role: 'Auditor', avatarId: '' },
];

const stores = [
    { name: 'ConnectFlow District 1', location: '123 Le Loi, D1, HCMC', manager: 'Jackson Lee' },
    { name: 'ConnectFlow District 7', location: '456 Nguyen Van Linh, D7, HCMC', manager: 'Isabella Nguyen' },
    { name: 'ConnectFlow Binh Thanh', location: '789 D5 Street, Binh Thanh, HCMC', manager: 'Olivia Martin' },
];

export default function SettingsPage() {
  const getAvatar = (id: string) => placeholderImages.find(p => p.id === id);
  const getFallback = (name: string) => name.split(' ').map(n => n[0]).join('');

  return (
    <Tabs defaultValue="users" className="space-y-4">
      <TabsList>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="stores">Stores</TabsTrigger>
        <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>

      <TabsContent value="users" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Manage your team members and their account permissions.
                </CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getAvatar(user.avatarId)?.imageUrl} data-ai-hint={getAvatar(user.avatarId)?.imageHint} />
                          <AvatarFallback>{getFallback(user.name)}</AvatarFallback>
                        </Avatar>
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stores" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Stores</CardTitle>
                <CardDescription>
                  Manage your store locations and assigned managers.
                </CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Store
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Store Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Manager</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stores.map((store) => (
                        <TableRow key={store.name}>
                            <TableCell className='font-medium'>{store.name}</TableCell>
                            <TableCell>{store.location}</TableCell>
                            <TableCell>{store.manager}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

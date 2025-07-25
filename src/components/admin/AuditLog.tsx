import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Download, 
  Filter, 
  Clock, 
  User, 
  DollarSign,
  Shield,
  Settings,
  AlertTriangle,
  Eye
} from 'lucide-react';

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  const auditLogs = [
    {
      id: 'audit-001',
      timestamp: '2024-01-20 14:30:25',
      action: 'Pricing Update',
      type: 'pricing',
      user: 'Admin Sarah',
      userId: 'admin-001',
      details: 'Updated base rate for Aerial Photography from R900 to R1000',
      changes: {
        before: { baseRate: 900 },
        after: { baseRate: 1000 }
      },
      ipAddress: '192.168.1.100',
      severity: 'medium'
    },
    {
      id: 'audit-002',
      timestamp: '2024-01-20 13:45:12',
      action: 'Pilot Suspension',
      type: 'moderation',
      user: 'Admin John',
      userId: 'admin-002',
      details: 'Suspended pilot Mike Chen due to expired insurance',
      changes: {
        pilotId: 'pilot-002',
        before: { status: 'active' },
        after: { status: 'suspended' }
      },
      ipAddress: '192.168.1.101',
      severity: 'high'
    },
    {
      id: 'audit-003',
      timestamp: '2024-01-20 12:15:33',
      action: 'Service Configuration',
      type: 'service',
      user: 'Admin Sarah',
      userId: 'admin-001',
      details: 'Added new service: Aerial Mapping',
      changes: {
        before: null,
        after: { serviceId: 'aerial-mapping', baseRate: 1200 }
      },
      ipAddress: '192.168.1.100',
      severity: 'low'
    },
    {
      id: 'audit-004',
      timestamp: '2024-01-20 11:22:18',
      action: 'Multiplier Adjustment',
      type: 'pricing',
      user: 'Admin John',
      userId: 'admin-002',
      details: 'Updated maximum multiplier for Emergency Response from 1.2x to 1.15x',
      changes: {
        serviceId: 'emergency',
        before: { maxMultiplier: 1.2 },
        after: { maxMultiplier: 1.15 }
      },
      ipAddress: '192.168.1.101',
      severity: 'medium'
    },
    {
      id: 'audit-005',
      timestamp: '2024-01-20 10:05:44',
      action: 'Pilot Verification',
      type: 'verification',
      user: 'System',
      userId: 'system',
      details: 'Automatically verified license for pilot David Rodriguez',
      changes: {
        pilotId: 'pilot-003',
        before: { licenseVerified: false },
        after: { licenseVerified: true }
      },
      ipAddress: 'system',
      severity: 'low'
    },
    {
      id: 'audit-006',
      timestamp: '2024-01-19 16:30:12',
      action: 'Security Alert',
      type: 'security',
      user: 'System',
      userId: 'system',
      details: 'Failed login attempt detected from suspicious IP',
      changes: {
        before: null,
        after: { failedAttempts: 3, ipBlocked: true }
      },
      ipAddress: '45.123.456.789',
      severity: 'high'
    }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'pricing':
        return <DollarSign className="h-4 w-4" />;
      case 'moderation':
        return <Shield className="h-4 w-4" />;
      case 'service':
        return <Settings className="h-4 w-4" />;
      case 'verification':
        return <User className="h-4 w-4" />;
      case 'security':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-xs border-orange text-orange">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" className="text-xs bg-secondary/20 text-secondary">Low</Badge>;
      default:
        return null;
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || log.type === selectedType;
    return matchesSearch && matchesType;
  });

  const exportLogs = () => {
    // Implementation for exporting logs
    console.log('Exporting audit logs...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Log</h2>
          <p className="text-muted-foreground">Track all administrative actions and system changes</p>
        </div>
        <Button onClick={exportLogs} variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Logs</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search actions, users, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="pricing">Pricing</option>
                <option value="moderation">Moderation</option>
                <option value="service">Service</option>
                <option value="verification">Verification</option>
                <option value="security">Security</option>
              </select>
              
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm"
              >
                <option value="1day">Last 24 hours</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Entries */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-2 rounded-lg flex items-center justify-center ${
                    log.severity === 'high' ? 'bg-red-100 text-red-600' :
                    log.severity === 'medium' ? 'bg-orange-100 text-orange-600' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {getActionIcon(log.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{log.action}</h3>
                      {getSeverityBadge(log.severity)}
                      <Badge variant="outline" className="text-xs capitalize">
                        {log.type}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{log.details}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span>{log.user}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">IP:</span>
                        <span className="font-mono text-xs">{log.ipAddress}</span>
                      </div>
                    </div>

                    {/* Changes Details */}
                    {log.changes && (
                      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-2">CHANGES</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          {log.changes.before && (
                            <div>
                              <span className="font-medium text-red-600">Before:</span>
                              <pre className="mt-1 text-muted-foreground font-mono">
                                {JSON.stringify(log.changes.before, null, 2)}
                              </pre>
                            </div>
                          )}
                          {log.changes.after && (
                            <div>
                              <span className="font-medium text-green-600">After:</span>
                              <pre className="mt-1 text-muted-foreground font-mono">
                                {JSON.stringify(log.changes.after, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span className="text-xs">View</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No audit logs found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or date range</p>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{auditLogs.length}</p>
              <p className="text-sm text-muted-foreground">Total Actions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {auditLogs.filter(log => log.severity === 'high').length}
              </p>
              <p className="text-sm text-muted-foreground">High Severity</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange">
                {auditLogs.filter(log => log.type === 'pricing').length}
              </p>
              <p className="text-sm text-muted-foreground">Pricing Changes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">
                {auditLogs.filter(log => log.user !== 'System').length}
              </p>
              <p className="text-sm text-muted-foreground">Admin Actions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLog;
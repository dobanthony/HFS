<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'address',
        'number',
        'birthday',
        'blood_type',
        'email',
        'password',
        'role', // Added role field
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be appended to the model's array / JSON form.
     *
     * @var list<string>
     */
    protected $appends = [
        'age',
    ];

    /**
     * Attribute casting.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'birthday' => 'date', // Keep as date for Carbon support
        'role' => 'string',
    ];

    /**
     * Boot method to set default values.
     */
    protected static function booted()
    {
        static::creating(function ($user) {
            if (empty($user->role)) {
                $user->role = 'user'; // Default role
            }
        });
    }

    /**
     * Ensure birthday is returned as YYYY-MM-DD for front-end forms.
     */
    public function getBirthdayAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('Y-m-d') : null;
    }

    /**
     * Accessor to calculate age from birthday.
     */
    public function getAgeAttribute(): ?int
    {
        return $this->birthday ? Carbon::parse($this->birthday)->age : null;
    }

    /**
     * Optional: Full name accessor.
     */
    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->middle_name} {$this->last_name}");
    }

    /**
     * Role check helpers.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isAgent(): bool
    {
        return $this->role === 'agent';
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }
}
